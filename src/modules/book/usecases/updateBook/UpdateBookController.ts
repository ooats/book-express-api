import { BaseController } from "../../../../core/infra/BaseController";
import { createBookDTO } from "../../dtos/models";
import { UpdateBookDTO } from "./UpdateBookDTO";
import {  UpdateBookErrors } from "./UpdateBookErrors";
import {  UpdateBookUseCase } from "./UpdateBookUseCase";


export class UpdateBookController extends BaseController {
    private useCase: UpdateBookUseCase;
  
    constructor(useCase: UpdateBookUseCase) {
      super();
      this.useCase = useCase;
    }
  
    async executeImpl(): Promise<any> {
      const dto: createBookDTO = this.req.body as UpdateBookDTO;
      
      try {
        const result = await this.useCase.execute(dto);
  
        if (result.isLeft()) {
          const error = result.value;
          switch (error.constructor) {
            case UpdateBookErrors.BookAlreadyExists:
              return this.conflict(error.errorValue().message);
            case UpdateBookErrors.BookNotFound:
              return this.conflict(error.errorValue().message);
            case UpdateBookErrors.BookTitleMissing:
                return this.conflict(error.errorValue().message);
            case UpdateBookErrors.InvalidInputError:
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
  