import { Repo } from "../../../core/infra/Repo";
import { Book } from "../domain/Book";
import { Isbn } from "../domain/Isbn";
import { BookMap } from "../mappers/bookMap";
import { IsbnMap } from "../mappers/isbnMap";
import { prisma } from "../../../config/prisma";
 import { BookTitleMap } from "../mappers/bookTitleMap";
import { AuthorMap } from "../mappers/authorMap";

export interface ICreateBookRepo extends  Repo<Book>   {
      getBookByISBN(isbn:Isbn): Promise<Book>;
      getAllBooks(): Promise<Book[]>;
      deleteBook(isbn: Isbn): Promise<void>;
      updateBook(book: Book): Promise<void>;
  }


  export class BookRepo implements ICreateBookRepo {
    async getAllBooks(): Promise<Book[]> {
      throw new Error("Method not implemented.");
      // let books:Book[];
      // let allBooks
      // try {
      //   allBooks = await prisma.books.findMany();
      // } catch (error) {
      //   Promise.reject();
      // }
      // allBooks?.map(bookItem=>{
      //   let bookProps = {
      //     isbn:IsbnMap.toDomain(bookItem.isbn),
      //     bookTitle:BookTitleMap.toDomain(bookItem.booktitle),
      //     author:AuthorMap.toDomain(bookItem.author)
      //   }
      //   let book = BookMap.toDomain(bookProps);
      //   books.push(book);

      // })
      // return books;
    }
    async deleteBook(isbn: Isbn): Promise<void> {
      //throw new Error("Method not implemented.");
      let deleteISBN = isbn.value;
      try {
        const executeDelete = await prisma.books.delete({
          where: {
            isbn: deleteISBN,
          }
        })
      } catch (error) {
        Promise.reject();
      }

    }
    async updateBook(book: Book): Promise<void> {
      let bookUpdate = BookMap.toPersistence(book);
      try {
        const update = await prisma.books.update({
          where: {
            isbn: bookUpdate.isbn,
          },
          data: {
            booktitle: bookUpdate.booktitle,
            author: bookUpdate.author
          },
        })
      } catch (error) {
        Promise.reject();
      }
      
    }
    async getBookByISBN(isbn: Isbn): Promise<Book> {
      let isbnString = isbn.value
      let bookExists;
      try {
        bookExists = await prisma.books.findUnique({
         where: {
           isbn : isbnString
         },
       })
     } catch (error) {
       
     }
      return BookMap.toDomain(bookExists)

    }
    async exists(book: Book): Promise<boolean> {
      let isbnString = BookMap.toPersistence(book).isbn;
      let bookExists;
      try {
         bookExists = await prisma.books.findUnique({
          where: {
            isbn : isbnString
          },
        })
      } catch (error) {
        Promise.reject();
      }
      return bookExists ? true : false;
    }
    async save(book: Book): Promise<void> {
      let persistBook = BookMap.toPersistence(book);
      let saveBook;
      try {
         saveBook = await prisma.books.create({
          data: persistBook
        })
      } catch (error) {
        
      }
      console.log('persisting book',saveBook)
    }
    
  }
