import { Book } from '../../../../modules/book/domain/Book';
import { Isbn } from '../../../../modules/book/domain/Isbn';
import { BookRepo } from '../../../../modules/book/repos/bookRepo';
import { CreateBookErrors } from '../../../../modules/book/usecases/createBook/CreateBookErrors';
import { CreateBookUseCase } from '../../../../modules/book/usecases/createBook/CreateBookUseCase';

// Mock BookRepo implementation for testing
class MockBookRepo implements BookRepo {
  getAllBooks(): Promise<Book[]> {
    throw new Error('Method not implemented.');
  }
  deleteBook(isbn: Isbn): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateBook(book: Book): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getBookByISBN(isbn: Isbn): Promise<Book | null> {
    throw new Error('Method not implemented.');
  }
  private books: any = {};

  async exists(book: any): Promise<boolean> {
    return this.books[book.isbn.value] !== undefined;
  }

  async save(book: any): Promise<void> {
    this.books[book.isbn.value] = book;
  }
}

describe('CreateBookUseCase', () => {
  let createBookUseCase: CreateBookUseCase;
  let mockBookRepo: MockBookRepo;

  beforeEach(() => {
    mockBookRepo = new MockBookRepo();
    createBookUseCase = new CreateBookUseCase(mockBookRepo);
  });

  it('should create a new book successfully', async () => {
    const request = {
      isbn: '1234567890',
      bookTitle: 'Sample Book',
      author: 'John Doe'
    };

    const response = await createBookUseCase.execute(request);

    expect(response.isRight()).toBe(true);
  });

  it('should handle book already exists error', async () => {
    const existingBook = {
      isbn: '0987654321',
      bookTitle: 'Existing Book',
      author: 'Jane Smith'
    };
    mockBookRepo.save(existingBook);

    const request = {
      isbn: '0987654321',
      bookTitle: 'New Book',
      author: 'John Doe'
    };

    const response = await createBookUseCase.execute(request);
    console.log(response);

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(CreateBookErrors.BookAlreadyExists);
  });

  it('should handle invalid input error', async () => {
    const request = {
      isbn: 'invalid-isbn',
      bookTitle: '',
      author: ''
    };

    const response = await createBookUseCase.execute(request);

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(CreateBookErrors.InvalidInputError);
  });
});
