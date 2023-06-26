import { Mapper } from "../../../core/infra/Mapper";
import { Book } from "../domain/Book";
import { BookTitle } from "../domain/bookTitle";
import { AuthorMap } from "./authorMap";
import { BookTitleMap } from "./bookTitleMap";
import { IsbnMap } from "./isbnMap";

export class BookMap extends Mapper<Book> {
  public static toDomain(raw: any): Book {
    const bookorError = Book.create({
      isbn: IsbnMap.toDomain(raw.isbn),
      bookTitle: BookTitleMap.toDomain(raw.booktitle),
      author: AuthorMap.toDomain(raw.author),
    });

    bookorError.isFailure ? console.log(bookorError.error) : "";

    return bookorError.isSuccess
      ? bookorError.getValue()
      : bookorError.errorValue();
  }

  public static toPersistence(book: Book): any {
    return {
      isbn: book.isbn.value,
      booktitle: book.bookTitle.value,
      author: book.author.value,
    };
  }

  public static toDTO(book: Book): any {
    return {
      isbn: book.isbn.value,
      bookTitle: book.bookTitle.value,
      author: book.author.value,
    };
  }
}
