export interface bookDTO{
    isbn: string;
    bookTitle : string;
    author: string;
  
  }
export type booksDTO = bookDTO[];


export interface createBookDTO{
  isbn: string;
  bookTitle : string;
  author: string;
}
