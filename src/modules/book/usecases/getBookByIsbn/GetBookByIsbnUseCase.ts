
import { BookRepo, ICreateBookRepo } from "../../repos/bookRepo";
import { createBookDTO } from "../../dtos/models";
import { Isbn } from "../../domain/Isbn";
import { UseCase } from "../../../../core/domain/UseCase";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { Book } from "../../domain/Book";
import { GetBookByISBNDTO } from "./GetBookByIsbnDTO";
import { GenericAppError } from "../../../../core/logic/AppError";
import { GetBookByIsbnErrors } from "./GetBookByIsbnErrors";

type Response = Either<
GetBookByIsbnErrors.BookAlreadyExists 
| GetBookByIsbnErrors.BookNotFound
| GetBookByIsbnErrors.BookTitleMissing|
GetBookByIsbnErrors.InvalidInputError,
  Result<Book>
>;

export class GetBookByIsbnUseCase
  implements UseCase<GetBookByISBNDTO, Promise<Response>>
{
  private bookRepo: BookRepo;

  constructor(bookRepo: BookRepo) {
    this.bookRepo = bookRepo;
  }
  
  async execute(req: GetBookByISBNDTO): Promise<Response> {

    const isbnorError = Isbn.create(req.isbn);
    
    let isbnFailed = isbnorError.isFailure;

    if(isbnFailed){
    return left(new GetBookByIsbnErrors.InvalidInputError(isbnorError.errorValue().value)) as Response;

    }

    let pureISBN = isbnorError.getValue();

    let book;
    try {
       book =await this.bookRepo.getBookByISBN(pureISBN);

      let bookNotFound: boolean = book === null;

      if(bookNotFound){
        return left(new GetBookByIsbnErrors.BookNotFound(isbnorError.errorValue().value)) as Response;
      }     
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error));

    }

    return right(Result.ok<Book>( book)) as Response;

  }
 
}