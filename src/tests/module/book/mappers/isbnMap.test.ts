import { Isbn } from "../../../../modules/book/domain/Isbn";
import { IsbnMap } from "../../../../modules/book/mappers/isbnMap";

describe("ISBN mapper", () => {
  it("should map valid ISBN string todomain", () => {
    let isbn = "1-56619-909-3";
    let validISBN = IsbnMap.toDomain(isbn);
    expect(validISBN).toBeInstanceOf(Isbn);
  });
});
