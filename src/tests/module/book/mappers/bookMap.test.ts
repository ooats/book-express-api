import { Book } from "../../../../modules/book/domain/Book";
import { BookTitle } from "../../../../modules/book/domain/bookTitle";
import { BookMap } from "../../../../modules/book/mappers/bookMap";

describe("Book mapper",()=>{

    it("should map book to valid domain object", ()=>{
        let book = {isbn: "1234567890",bookTitle: "author",author:"rete"};
        let validBook = BookMap.toDomain(book)
        expect(validBook).toBeInstanceOf(Book);
    })

  
   
})