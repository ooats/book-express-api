import { bookRepo } from "../../repos";
import { CreateBookController } from "./CreateBookController";
import { CreateBookUseCase } from "./CreateBookUseCase";

const createBookUseCase = new CreateBookUseCase(bookRepo);
const createBookController = new CreateBookController(createBookUseCase);

export { createBookController };
