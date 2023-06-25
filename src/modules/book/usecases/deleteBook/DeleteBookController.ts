import { BaseController } from "../../../../core/infra/BaseController";
import { createBookDTO } from "../../dtos/models";
import { DeleteBookDTO } from "./DeleteBookDTO";
import { DeleteBookErrors } from "./DeleteBookErrors";
import {  DeleteBookUseCase } from "./DeleteBookUseCase";


export class DeleteBookController extends BaseController {
    private useCase: DeleteBookUseCase;
  
    constructor(useCase: DeleteBookUseCase) {
      super();
      this.useCase = useCase;
    }
  
    async executeImpl(): Promise<any> {
      const dto: DeleteBookDTO = this.req.body as DeleteBookDTO;
      
      try {
        const result = await this.useCase.execute(dto);
  
        if (result.isLeft()) {
          const error = result.value;
          switch (error.constructor) {
            case DeleteBookErrors.BookAlreadyExists:
              return this.conflict(error.errorValue().message);
            case DeleteBookErrors.BookNotFound:
              return this.conflict(error.errorValue().message);
            case DeleteBookErrors.BookTitleMissing:
                return this.conflict(error.errorValue().message);
            case DeleteBookErrors.InvalidInputError:
                return this.conflict(error.errorValue().message);
            default:
              console.log("Error here", error.errorValue().message)
              return this.fail(error.errorValue().message);
          }
        } else {
  
          return this.ok(this.res);
        }
      } catch (err: any) {
        return this.fail(err);
      }
    }
  }
  