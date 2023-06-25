import { Result } from "../../../../core/logic/Result";
import { UseCaseError } from "../../../../core/logic/UseCaseError";

export namespace DeleteBookErrors {
  export class BookAlreadyExists extends Result<UseCaseError> {
    constructor(isbn: string) {
      super(false, {
        message: `A book with the provided, ${isbn} already exists.`,
      } as UseCaseError);
    }
  }

  export class InvalidInputError extends Result<UseCaseError> {
    constructor(message: string) {
      super(false, {
        message: `${message}`,
      } as UseCaseError);
    }
  }

 


  export class BookTitleMissing extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Book, is Missing`,
      } as UseCaseError);
    }
  }

  


  export class BookNotFound extends Result<UseCaseError> {
    constructor(isbn: string) {
      super(false, {
        message: `A book with the supplied account, ${isbn} was not found.`,
      } as UseCaseError);
    }
  }






}