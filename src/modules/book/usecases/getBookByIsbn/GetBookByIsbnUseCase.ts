
import { BookRepo, ICreateBookRepo } from "../../repos/bookRepo";
import { createBookDTO } from "../../dtos/models";
import { Isbn } from "../../domain/Isbn";
import { UseCase } from "../../../../core/domain/UseCase";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { Book } from "../../domain/Book";
import { GetBookByISBNDTO } from "./GetBookByIsbnDTO";
import { GenericAppError } from "../../../../core/logic/AppError";
import { GetBookByIsbnErrors } from "./GetBookByIsbnErrors";
import { Prisma } from "@prisma/client";

type Response = Either<
GetBookByIsbnErrors.BookAlreadyExists 
| GetBookByIsbnErrors.BookNotFound
| GetBookByIsbnErrors.BookTitleMissing|
GetBookByIsbnErrors.InvalidInputError,
  Result<Book>
>;

export class GetBookByIsbnUseCase
  implements UseCase<string, Promise<Response>>
{
  private bookRepo: BookRepo;

  constructor(bookRepo: BookRepo) {
    this.bookRepo = bookRepo;
  }
  
  async execute(isbn: string): Promise<Response> {

    const isbnorError = Isbn.create(isbn);
    
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
        return left(new GetBookByIsbnErrors.BookNotFound(pureISBN.value)) as Response;
      }     
    } catch (error) {
      // if(error instanceof Prisma.PrismaClientKnownRequestError){
      //   return left(new GetBookByIsbnErrors.BookNotFound(pureISBN.value))
      // }
      return left(new GenericAppError.UnexpectedError(error));

    }

    return right(Result.ok<Book>( book!)) as Response;

  }
 
}