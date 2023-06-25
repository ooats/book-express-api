import { bookRepo } from "../../repos";
import {  DeleteBookController } from "./DeleteBookController";
import {  DeleteBookUseCase } from "./DeleteBookUseCase";

const deleteBookUseCase = new DeleteBookUseCase(bookRepo);
const deleteBookController = new DeleteBookController(deleteBookUseCase);

export {  deleteBookController };