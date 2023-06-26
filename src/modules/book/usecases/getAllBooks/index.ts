import { bookRepo } from "../../repos";
import { GetAllBooksController } from "./GetAllBooksController";
import { GetAllBooksUseCase } from "./GetAllBooksUseCase";

const getAllBooksUseCase = new GetAllBooksUseCase(bookRepo);
const getAllBooksController = new GetAllBooksController(getAllBooksUseCase);

export { getAllBooksController };
