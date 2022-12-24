const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require("../index");


const API = process.env.BASE_URL;
chai.use(chaiHttp);

describe("Test for Products Routes", () => {
    it("test for create product", () => {
        chai
            .request(API)
            .post('/api/v1/product/create')
            .send({
                content: "handbag.jpg",
                name: "Hand bag",
                price: 50
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a("object");
                res.body.should.have.property("status");
                res.body.should.have.property("savedProduct");
                res.body.status.should.contain("OK")
                done()
            })
    })

    it("should get all products", () => {
        chai
            .request(API)
            .get('/api/v1/product/get/all')
            .end((err, res) => {
                res.should.have.status(200)
            });
    })
})