import { Book } from "../../../../modules/book/domain/Book";
import { Isbn } from "../../../../modules/book/domain/Isbn";
import { BookTitle } from "../../../../modules/book/domain/bookTitle";
import { BookTitleMap } from "../../../../modules/book/mappers/bookTitleMap";
import { IsbnMap } from "../../../../modules/book/mappers/isbnMap";

describe("Book title mapper",()=>{
    it("should map valid book title string todomain", ()=>{
        let book = "harry potter";
        let validBook = BookTitleMap.toDomain(book)
        expect(validBook).toBeInstanceOf(BookTitle);
    })

   
})