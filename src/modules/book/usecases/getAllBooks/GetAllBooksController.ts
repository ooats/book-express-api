import { BaseController } from "../../../../core/infra/BaseController";
import { createBookDTO } from "../../dtos/models";
import { BookMap } from "../../mappers/bookMap";
import { GetAllBookErrors } from "./GetAllBooksErrors";
import { GetAllBooksUseCase } from "./GetAllBooksUseCase";

export class GetAllBooksController extends BaseController {
  private useCase: GetAllBooksUseCase;

  constructor(useCase: GetAllBooksUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(): Promise<any> {
    try {
      const result = await this.useCase.execute();

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case GetAllBookErrors.BookAlreadyExists:
            return this.conflict(error.errorValue().message);
          case GetAllBookErrors.BookNotFound:
            return this.conflict(error.errorValue().message);
          case GetAllBookErrors.BookTitleMissing:
            return this.conflict(error.errorValue().message);
          case GetAllBookErrors.InvalidInputError:
            return this.conflict(error.errorValue().message);
          default:
            console.log("Error here", error.errorValue().message);
            return this.fail(error.errorValue().message);
        }
      } else {
        const book = result.value.getValue();

        let books: any[] = [];

        book.map((b) => {
          books.push(BookMap.toDTO(b));
        });

        return this.ok<any[]>(this.res, books);
      }
    } catch (err: any) {
      return this.fail(err);
    }
  }
}
