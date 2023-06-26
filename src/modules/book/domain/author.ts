import { ValueObject } from "../../../core/domain/ValueObject";
import { Result } from "../../../core/logic/Result";

interface authorProps {
  value: string;
}

export class Author extends ValueObject<authorProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: authorProps) {
    super(props);
  }

  public static create(author: string): Result<Author> {
    let authorisNull = !!author === false || author.length === 0;

    if (authorisNull) {
      return Result.fail<Author>("Must Provide Valid Author");
    } else {
      return Result.ok<Author>(new Author({ value: author }));
    }
  }
}
