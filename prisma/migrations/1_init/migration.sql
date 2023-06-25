-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "isbn" VARCHAR(50),
    "booktitle" VARCHAR(50),
    "author" VARCHAR(50),

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");

