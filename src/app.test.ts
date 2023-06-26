import request from "supertest";

import app from "./app";

describe("GET /", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          message: "live",
        },
        done
      );
  });
});

describe("POST / create book", () => {
  let payload = {
    isbn: "1-56619-909-3",
    bookTitle: "Harry Potter",
    author: "harry potter",
  };
  it("responds with a json message", (done) => {
    request(app)
      .post("/books/create")
      .send(payload)
      .set("Accept", "application/json")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(201, "Created", done);
  });
});
