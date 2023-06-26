import { BookTitle } from "../../../../modules/book/domain/bookTitle";

describe("Create valid book title", () => {
  it("should fail to create book with an empty string", () => {
    const book = BookTitle.create("");

    expect(book.isFailure).toBe(true);
    expect(book.isSuccess).toBe(false);
  });

  it("should create book with an string", () => {
    const book = BookTitle.create("john doe");

    expect(book.isFailure).toBe(false);
    expect(book.isSuccess).toBe(true);
    expect(book.getValue()).toBeInstanceOf(BookTitle);
  });
});
