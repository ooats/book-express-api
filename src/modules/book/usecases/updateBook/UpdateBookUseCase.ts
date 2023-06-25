
import { BookRepo, ICreateBookRepo } from "../../repos/bookRepo";
import { createBookDTO } from "../../dtos/models";
import { Isbn } from "../../domain/Isbn";
import { UseCase } from "../../../../core/domain/UseCase";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { Book } from "../../domain/Book";
import {  UpdateBookErrors } from "./UpdateBookErrors";
import { UpdateBookDTO } from "./UpdateBookDTO";
import { DeleteBookErrors } from "../deleteBook/DeleteBookErrors";
import { GenericAppError } from "../../../../core/logic/AppError";
import { Author } from "../../domain/author";
import { BookTitle } from "../../domain/bookTitle";
import { CreateBookErrors } from "../createBook/CreateBookErrors";

type Response = Either<
UpdateBookErrors.BookAlreadyExists 
| UpdateBookErrors.BookNotFound
| UpdateBookErrors.BookTitleMissing|
UpdateBookErrors.InvalidInputError,
  Result<Book>
>;

export class UpdateBookUseCase
  implements UseCase<UpdateBookDTO, Promise<Response>>
{
  private bookRepo: BookRepo;

  constructor(bookRepo: BookRepo) {
    this.bookRepo = bookRepo;
  }
  
  async execute(req: UpdateBookDTO): Promise<Response> {

    const isbnorError = Isbn.create(req.isbn);
    const bookTitleorError = BookTitle.create(req.bookTitle);
    const authororError = Author.create(req.author);

    const combinedPropsResult = Result.combine([isbnorError, bookTitleorError, authororError]);

    if (combinedPropsResult.isFailure) {
      return left(new UpdateBookErrors.InvalidInputError(combinedPropsResult.error)) as Response;
    }

    const validISBN = isbnorError.getValue();

    try {
      const bookExists  = await this.bookRepo.getBookByISBN(
        validISBN
      );
        
      let bookNotFound = bookExists == null
  
      if(bookNotFound){
        return left(new DeleteBookErrors.BookNotFound(req.isbn)) as Response;
      }

       await this.bookRepo.updateBook(bookExists);

    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error));
    }

    return right(Result.ok<Book>()) as Response;

  }
 
}