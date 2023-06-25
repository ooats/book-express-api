import { bookRepo } from "../../repos";
import { createBookController } from "../createBook";
import {  UpdateBookController } from "./UpdateBookController";
import {  UpdateBookUseCase } from "./UpdateBookUseCase";

const updateBookUseCase = new UpdateBookUseCase(bookRepo);
const updateBookController = new UpdateBookController(updateBookUseCase);

export {  updateBookController };