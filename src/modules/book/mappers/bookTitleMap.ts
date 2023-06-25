import { Mapper } from "../../../core/infra/Mapper";
import { Author } from "../domain/author";
import { BookTitle } from "../domain/bookTitle";

export class BookTitleMap extends Mapper<BookTitle> {
    public static toDomain(bookTitle: string): BookTitle {
  
  
      const bookTitleOrError = BookTitle.create(
        bookTitle
        
      );
  
      bookTitleOrError.isFailure ? console.log(bookTitleOrError.error) : "";
  
      return bookTitleOrError.isSuccess
        ? bookTitleOrError.getValue()
        : bookTitleOrError.errorValue();
    }
  
    
  }