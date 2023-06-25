-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "isbn" VARCHAR(50) NOT NULL,
    "booktitle" VARCHAR(50) NOT NULL,
    "author" VARCHAR(50) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

