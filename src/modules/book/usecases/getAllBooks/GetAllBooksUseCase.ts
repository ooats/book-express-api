import { BookRepo, ICreateBookRepo } from "../../repos/bookRepo";
import { createBookDTO } from "../../dtos/models";
import { Isbn } from "../../domain/Isbn";
import { UseCase } from "../../../../core/domain/UseCase";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { Book } from "../../domain/Book";
import { GetAllBookErrors } from "./GetAllBooksErrors";
import { GenericAppError } from "../../../../core/logic/AppError";

type Response = Either<
  GetAllBookErrors.BookNotFound | GetAllBookErrors.InvalidInputError,
  Result<Book[]>
>;

export class GetAllBooksUseCase implements UseCase<null, Promise<Response>> {
  private bookRepo: BookRepo;

  constructor(bookRepo: BookRepo) {
    this.bookRepo = bookRepo;
  }

  async execute(): Promise<Response> {
    try {
      const merchant = await this.bookRepo.getAllBooks();

      return right(Result.ok<any[]>(merchant));
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err));
    }
  }
}
