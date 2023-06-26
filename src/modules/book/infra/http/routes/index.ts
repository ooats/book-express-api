import * as express from "express";
import { createBookController } from "../../../usecases/createBook";
import { getAllBooksController } from "../../../usecases/getAllBooks";
import { getBookByIsbnController } from "../../../usecases/getBookByIsbn";
import { deleteBookController } from "../../../usecases/deleteBook";
import { updateBookController } from "../../../usecases/updateBook";

const booksRouter = express.Router();

booksRouter.post("/create", (req, res) =>
  createBookController.execute(req, res)
);
// booksRouter.get("/all", (req, res) => getAllBooksController.execute(req, res));
booksRouter.get("/findBookbyIsbn/:isbn", (req, res) =>
  getBookByIsbnController.execute(req, res)
);
booksRouter.put("/update", (req, res) =>
  updateBookController.execute(req, res)
);
booksRouter.delete("/delete/:isbn", (req, res) =>
  deleteBookController.execute(req, res)
);

export { booksRouter };
