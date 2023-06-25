import { Mapper } from "../../../core/infra/Mapper";
import { Author } from "../domain/author";

export class AuthorMap extends Mapper<Author> {
    public static toDomain(author: string): Author {
  
  
      const authororError = Author.create(
        author
        
      );
  
      authororError.isFailure ? console.log(authororError.error) : "";
  
      return authororError.isSuccess
        ? authororError?.getValue()
        : authororError.errorValue();
    }
  
    
  }