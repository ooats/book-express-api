import { BookRepo, ICreateBookRepo } from "../../repos/bookRepo";
import { createBookDTO } from "../../dtos/models";
import { Isbn } from "../../domain/Isbn";
import { UseCase } from "../../../../core/domain/UseCase";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { Book } from "../../domain/Book";
import { DeleteBookErrors } from "./DeleteBookErrors";
import { DeleteBookDTO } from "./DeleteBookDTO";
import { GenericAppError } from "../../../../core/logic/AppError";

type Response = Either<
  | DeleteBookErrors.BookAlreadyExists
  | DeleteBookErrors.BookNotFound
  | DeleteBookErrors.BookTitleMissing
  | DeleteBookErrors.InvalidInputError,
  Result<Book>
>;

export class DeleteBookUseCase implements UseCase<string, Promise<Response>> {
  private bookRepo: BookRepo;

  constructor(bookRepo: BookRepo) {
    this.bookRepo = bookRepo;
  }

  async execute(isbn: string): Promise<Response> {
    const isbnorError = Isbn.create(isbn);

    if (isbnorError.isFailure) {
      return left(
        new DeleteBookErrors.InvalidInputError(isbnorError.error.toString())
      ) as Response;
    }

    const validISBN = isbnorError.getValue();
    let bookExists;
    try {
      bookExists = await this.bookRepo.getBookByISBN(validISBN);
      let bookNotFound = bookExists == null;

      if (bookNotFound) {
        return left(new DeleteBookErrors.BookNotFound(isbn)) as Response;
      }

      const deleteBook = await this.bookRepo.deleteBook(validISBN);
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error));
    }

    return right(Result.ok<Book>()) as Response;
  }
}
