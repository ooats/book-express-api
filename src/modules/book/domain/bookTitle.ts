import { ValueObject } from "../../../core/domain/ValueObject";
import { Result } from "../../../core/logic/Result";

interface bookTitleProps {
  value: string;
}

export class BookTitle extends ValueObject<bookTitleProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: bookTitleProps) {
    super(props);
  }

  public static create(bookTitle: string): Result<BookTitle> {
    let bookTitleisNull = !!bookTitle === false || bookTitle.length === 0;

    if (bookTitleisNull) {
      return Result.fail<BookTitle>("Must Provide Book Title");
    } else {
      return Result.ok<BookTitle>(new BookTitle({ value: bookTitle }));
    }
  }
}
