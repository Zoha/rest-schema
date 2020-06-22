const { addMiddleware } = require("../../src/restSchema/set")
const { expect } = require("chai")

describe("add plugin middleware", () => {
  it("will add middleware", () => {
    const specificTarget = {}
    const middleware = () => {}
    addMiddleware("create", middleware, { target: specificTarget })
    expect(specificTarget.create[0]).to.be.equal(middleware)
  })
})
