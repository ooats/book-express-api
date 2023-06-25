export interface bookDTO{
    isbn: string;
    bookTitle : string;
    author: string;
    dateCreated: Date | string;
    dateUpdated: Date | string;
  }
export type booksDTO = bookDTO[];


export interface createBookDTO{
  isbn: string;
  bookTitle : string;
  author: string;
}
