import { Isbn } from "../../../../modules/book/domain/Isbn";

describe("Create isbn object",()=>{
    it("should fail to create isbn with an empty string", ()=>{

        const isbn =  Isbn.create("");

        expect(isbn.isFailure).toBe(true);
        expect(isbn.isSuccess).toBe(false);
        expect(isbn.getValue()).toBe(null);

    })

    it("should create isbn with a random string", ()=>{

        const isbn =  Isbn.create("18900");

        expect(isbn.isFailure).toBe(true);
        expect(isbn.isSuccess).toBe(false);
        expect(isbn.getValue()).toBe(null);

    })

    it("should create isbn object which is only in isbn format", ()=>{

        let isbnString = "1-56619-909-3";
        const isbn =  Isbn.create("1-56619-909-3");

        expect(isbn.isFailure).toBe(false)
        expect(isbn.isSuccess).toBe(true);
        expect(isbn.getValue()).toBeInstanceOf(Isbn);
        expect(isbn.getValue().value).toBe(isbnString);



    })
})