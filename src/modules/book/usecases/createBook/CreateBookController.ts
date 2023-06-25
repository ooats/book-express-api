import { BaseController } from "../../../../core/infra/BaseController";
import { createBookDTO } from "../../dtos/models";
import { CreateBookErrors } from "./CreateBookErrors";
import { CreateBookUseCase } from "./CreateBookUseCase";


export class CreateBookController extends BaseController {
    private useCase: CreateBookUseCase;
  
    constructor(useCase: CreateBookUseCase) {
      super();
      this.useCase = useCase;
    }
  
    async executeImpl(): Promise<any> {
      const dto: createBookDTO = this.req.body as createBookDTO;
      
      try {
        const result = await this.useCase.execute(dto);
  
        if (result.isLeft()) {
          const error = result.value;
          switch (error.constructor) {
            case CreateBookErrors.BookAlreadyExists:
              return this.conflict(error.errorValue().message);
            case CreateBookErrors.BookNotFound:
              return this.conflict(error.errorValue().message);
            case CreateBookErrors.BookTitleMissing:
                return this.conflict(error.errorValue().message);
            case CreateBookErrors.InvalidInputError:
                return this.conflict(error.errorValue().message);
            default:
              console.log("Error here", error.errorValue().message)
              return this.fail(error.errorValue().message);
          }
        } else {
  
          return this.created(this.res);
        }
      } catch (err: any) {
        return this.fail(err);
      }
    }
  }
  