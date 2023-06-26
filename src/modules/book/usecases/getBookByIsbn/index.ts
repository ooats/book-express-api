import { bookRepo } from "../../repos";
import { GetBookByIsbnController } from "./GetBookByIsbnController";
import { GetBookByIsbnUseCase } from "./GetBookByIsbnUseCase";

const getBookByIsbnUseCase = new GetBookByIsbnUseCase(bookRepo);
const getBookByIsbnController = new GetBookByIsbnController(
  getBookByIsbnUseCase
);

export { getBookByIsbnController };
