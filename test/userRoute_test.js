const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");

const API = process.env.BASE_URL;
chai.use(chaiHttp); //mock http call

describe("/POST testing user signup", () => {
  it("create a new user", () => {
    chai
      .request(API)
      .post("/api/v1/user/signup")
      .send({
        name: "lorem",
        email: "lorem12@gmail.com",
        password: "1234",
        isSeller: false,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.contain("User created successfully");
        done();
      });
  });
});

describe("/Post testing user signin", () => {
  it("it should log the user in", () => {
    chai
      .request(API)
      .post("/api/v1/user/signin")
      .send({
        email: "lorem12@gmail.com",
        password: "1234",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("bearerToken");
        res.body.should.have.property("isUserExist");
        done();
      });
  });
});

describe("/GET test for user logout", () => {
  it("it should log the user out", () => {
    chai
      .request(API)
      .get("/api/v1/user/signout")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.contain("Cookie deleted");
        done();
      });
  });
});
