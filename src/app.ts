import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

require('dotenv').config();


import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { booksRouter } from './modules/book/infra/http/routes';


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({  
  allowedHeaders: [ "Origin", "X-Requested-With",    
  "Content-Type", "Accept", "X-Access-Token", "Authorization",    ], 
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",   
  preflightContinue: true,   
  origin: "*",  }));
app.use(express.json());

const options = {
  definition: {
    "openapi": "3.0.3",
    "info": {
      "title": "Book Management System",
      "contact": {
        "email": "rthamage67@gmail.com"
      },
      "license": {
        "name": "Apache 2.0",
        "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
      },
      "version": "1.0.11"
    },
    "servers": [
      {
        "url": "http://localhost:5000"
      }
    ],
    "tags": [
      {
        "name": "book",
        "description": "Access to crud methods"
      }
    ],
    "paths": {
      "/": {
        "get": {
          "tags": [
            "book"
          ],
          "summary": "test endpoint",
          "responses": {
            "200": {
              "description": "Successful operation"
            }
          }
        }
      },
      "/book/findBookbyIsbn/{Isbn}": {
        "get": {
          "tags": [
            "book"
          ],
          "summary": "Get book by Isbn",
          "description": "Get Book by ISBN",
          "operationId": "findBookByIsbn",
          "parameters": [
            {
              "name": "Isbn",
              "in": "path",
              "description": "ISBN of book to return",
              "required": true,
              "explode": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Book"
                  }
                }
              }
            },
            "403": {
              "description": "Invalid input"
            },
            "404": {
              "description": "Book not found"
            }
          }
        }
      },
      "/book/create": {
        "post": {
          "tags": [
            "book"
          ],
          "summary": "Create book",
          "description": "Create a book",
          "operationId": "createBook",
          "requestBody": {
            "description": "create book",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Book"
                }
              }
            },
            "required": true
          },
          "responses": {
            "201": {
              "description": "Created"
            },
            "401": {
              "description": "Book Already exists"
            },
            "403": {
              "description": "Invalid input"
            },
            "405": {
              "description": "Validation exception"
            }
          }
        }
      },
      "/book/update": {
        "put": {
          "tags": [
            "book"
          ],
          "summary": "Update an existing book",
          "description": "Update an existing book by ISBN",
          "operationId": "updateBook",
          "requestBody": {
            "description": "Update an book in the library",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Book"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Book"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid ID supplied"
            },
            "404": {
              "description": "Book not found"
            },
            "405": {
              "description": "Validation exception"
            }
          }
        }
      },
      "/book/delete/{Isbn}": {
        "delete": {
          "tags": [
            "book"
          ],
          "summary": "Delete a book",
          "description": "Delete an existing book by ISBN",
          "operationId": "deleteBook",
          "parameters": [
            {
              "name": "Isbn",
              "in": "path",
              "description": "ISBN of book to delete",
              "required": true,
              "explode": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Book"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid ID supplied"
            },
            "404": {
              "description": "Book not found"
            },
            "405": {
              "description": "Validation exception"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "Book": {
          "type": "object",
          "properties": {
            "isbn": {
              "type": "string",
              "example": "978-3-16-148410-0"
            },
            "bookTitle": {
              "type": "string",
              "example": "Harry Potter"
            },
            "author": {
              "type": "string",
              "example": "John Doe"
            }
          },
          "xml": {
            "name": "book"
          }
        }
      },
      "requestBodies": {
        "Book": {
          "description": "Book object that is created",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Book"
              }
            }
          }
        }
      }
    }
  },
  apis: [
    `${__dirname}/routes/example-route.ts`,
    "./dist/routes/example-route.js",
  ],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @swagger
 * 
 * 
 */
app.get('/', (req, res) => {
  try {
  } catch (error) {
    console.log(error)
  }
  res.json({
    message: 'live',

  });
});


app.use("/book",booksRouter);
export default app;
