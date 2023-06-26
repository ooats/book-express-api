import { AggregateRoot } from "../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Guard } from "../../../core/logic/Guard";
import { Result } from "../../../core/logic/Result";
import { Isbn } from "./Isbn";
import { Author } from "./author";
import { BookTitle } from "./bookTitle";

export interface BookProps {
  isbn: Isbn;
  bookTitle: BookTitle;
  author: Author;
}

export class Book extends AggregateRoot<BookProps> {
  get isbn(): Isbn {
    return this.props.isbn;
  }
  get bookTitle(): BookTitle {
    return this.props.bookTitle;
  }
  get author(): Author {
    return this.props.author;
  }

  private constructor(props: BookProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: BookProps, id?: UniqueEntityID): Result<Book> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.isbn, argumentName: "isbn" },
      { argument: props.bookTitle, argumentName: "bookTitle" },
      { argument: props.author, argumentName: "author" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Book>(guardResult.message);
    } else {
      const book = new Book(
        {
          ...props,
        },
        id
      );

      return Result.ok<Book>(book);
    }
  }
}
