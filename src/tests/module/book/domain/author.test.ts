import { Author } from "../../../../modules/book/domain/author";
describe("Create valid author title",()=>{
    it("should fail to create author with an empty string", ()=>{

        const author =  Author.create("");

        expect(author.isFailure).toBe(true);

    })

    it("should create author with an empty string", ()=>{

        const author =  Author.create("john doe");

        expect(author.isFailure).toBe(false)
        expect(author.isSuccess).toBe(true);
        expect(author.getValue()).toBeInstanceOf( Author);

    })
})

