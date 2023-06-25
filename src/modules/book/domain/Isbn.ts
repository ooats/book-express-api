import { ValueObject } from "../../../core/domain/ValueObject";
import { Result } from "../../../core/logic/Result";


interface IsbnProps {
    value: string;
  }
  
  export class Isbn extends ValueObject<IsbnProps> {
    get value(): string {
      return this.props.value;
    }
  
    private constructor(props: IsbnProps) {
      super(props);
    }
  
    public static create(isbn: string): Result<Isbn> {


        let regEx = new RegExp(/^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/);

        let isbnIsValid = !regEx.test(isbn);
        
        if (isbnIsValid) {
        return Result.fail<Isbn>("Must Provide Valid ISBN");
      } else {
        return Result.ok<Isbn>(new Isbn({ value: isbn }));
      }
    }
  }