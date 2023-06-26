import { Book } from "../../../../modules/book/domain/Book";
import { Isbn } from "../../../../modules/book/domain/Isbn";
import { Author } from "../../../../modules/book/domain/author";
import { BookTitle } from "../../../../modules/book/domain/bookTitle";

describe("Create valid book object", () => {
  it("should create valid book object", () => {
    const book = Book.create({
      isbn: Isbn.create("1-56619-909-3").getValue(),
      bookTitle: BookTitle.create("harry").getValue(),
      author: Author.create("Potter").getValue(),
    });

    expect(book.isFailure).toBe(false);
    expect(book.isSuccess).toBe(true);
  });
});
