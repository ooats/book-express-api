import { Mapper } from "../../../core/infra/Mapper";
import { Isbn } from "../domain/Isbn";
import { Author } from "../domain/author";
import { BookTitle } from "../domain/bookTitle";

export class IsbnMap extends Mapper<Isbn> {
    public static toDomain(isbn: string): Isbn {
  
  
      const isbnOrError = Isbn.create(
        isbn        
      );
  
      isbnOrError.isFailure ? console.log(isbnOrError.error) : "";
  
      return isbnOrError.isSuccess
        ? isbnOrError.getValue()
        : isbnOrError.errorValue();
    }
    // public static toPersistence()

        
  
    
  }