import { BookRepo, ICreateBookRepo } from "../../repos/bookRepo";
import { createBookDTO } from "../../dtos/models";
import { Isbn } from "../../domain/Isbn";
import { UseCase } from "../../../../core/domain/UseCase";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { Book, BookProps } from "../../domain/Book";
import { CreateBookErrors } from "./CreateBookErrors";
import { GenericAppError } from "../../../../core/logic/AppError";
import { BookTitle } from "../../domain/bookTitle";
import { Author } from "../../domain/author";

type Response = Either<
  | CreateBookErrors.BookAlreadyExists
  | CreateBookErrors.BookNotFound
  | CreateBookErrors.BookTitleMissing
  | CreateBookErrors.InvalidInputError,
  Result<Book>
>;

export class CreateBookUseCase
  implements UseCase<createBookDTO, Promise<Response>>
{
  private bookRepo: BookRepo;

  constructor(bookRepo: BookRepo) {
    this.bookRepo = bookRepo;
  }

  async execute(req: createBookDTO): Promise<Response> {
    const isbnorError = Isbn.create(req.isbn);
    const bookTitleorError = BookTitle.create(req.bookTitle);
    const authororError = Author.create(req.author);

    const combinedPropsResult = Result.combine([
      isbnorError,
      bookTitleorError,
      authororError,
    ]);

    if (combinedPropsResult.isFailure) {
      return left(
        new CreateBookErrors.InvalidInputError(combinedPropsResult.error)
      ) as Response;
    }
    const bookProps: BookProps = {
      isbn: isbnorError.getValue(),
      bookTitle: bookTitleorError.getValue(),
      author: authororError.getValue(),
    };
    const bookorError = Book.create(bookProps);

    if (bookorError.isFailure) {
      return left(Result.fail<void>(bookorError.error)) as Response;
    }

    const validISBN = isbnorError.getValue().value;

    try {
      const confirmBookExists: boolean = await this.bookRepo.exists(
        bookorError.getValue()
      );

      const bookExists = confirmBookExists === true;

      if (bookExists) {
        return left(
          new CreateBookErrors.BookAlreadyExists(req.isbn)
        ) as Response;
      }

      const saveBook = await this.bookRepo.save(bookorError.getValue());
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error));
    }
    return right(Result.ok<Book>()) as Response;
  }
}
