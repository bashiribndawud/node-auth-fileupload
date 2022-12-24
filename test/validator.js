const {
  validateEmail,
  validateName,
  validatePassword,
} = require("../utils/validators");

let { expect } = require("chai");

describe("Testing Validator", function () {
  it("it should return true for a valid name", () => {
    expect(validateName("Bashir")).to.equal(true);
  });

  it("it should return false for invalid name", () => {
    expect(validateName("Bashir010")).to.equal(false);
  });

  it('it should return true for a valid email', () => {
    expect(validateEmail("bashir@gmail.com")).to.equal(true)
  })

  it('it should return false for an invalid email', () => {
    expect(validateEmail('bahdg.gail.com')).to.equal(false)
  })

  it('it should return true for a valid password', () => {
    expect(validatePassword('1234')).to.equal(true)
  })

  it('it should return false for an invalid password', () => {
    expect(validatePassword('huiehwfe')).to.equal(false)
  })
});
