import { BaseController } from "../../../../core/infra/BaseController";
import { bookDTO, createBookDTO } from "../../dtos/models";
import {  GetBookByIsbnErrors } from "./GetBookByIsbnErrors";
import { GetBookByISBNDTO } from "./GetBookByIsbnDTO";
import {  GetBookByIsbnUseCase } from "./GetBookByIsbnUseCase";
import { BookMap } from "../../mappers/bookMap";


export class GetBookByIsbnController extends BaseController {
    private useCase: GetBookByIsbnUseCase;
  
    constructor(useCase: GetBookByIsbnUseCase) {
      super();
      this.useCase = useCase;
    }
  
    async executeImpl(): Promise<any> {
      const dto: GetBookByISBNDTO = this.req.body as GetBookByISBNDTO;
      
      try {
        const result = await this.useCase.execute(dto);
  
        if (result.isLeft()) {
          const error = result.value;
          switch (error.constructor) {
            case GetBookByIsbnErrors.BookNotFound:
              return this.conflict(error.errorValue().message);
            case GetBookByIsbnErrors.InvalidInputError:
                return this.conflict(error.errorValue().message);
            default:
              console.log("Error here", error.errorValue().message)
              return this.fail(error.errorValue().message);
          }
        } else {
          const book  = result.value.getValue();
  
          return this.ok<bookDTO>(this.res, BookMap.toDTO(book))        }
      } catch (err: any) {
        return this.fail(err);
      }
    }
  }
  