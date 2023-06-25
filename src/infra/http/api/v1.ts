import express from "express";
import { booksRouter } from "../../../modules/book/infra/http/routes";

const v1Router = express.Router();

v1Router.use("/book", booksRouter);


export { v1Router };