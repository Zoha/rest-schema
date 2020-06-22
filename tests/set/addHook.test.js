const { addHook } = require("../../src/restSchema/set")
const { expect } = require("chai")

describe("add plugin hook", () => {
  it("will add hook", () => {
    const specificTarget = {}
    const hook = () => {}
    addHook("create", "beforeResponse", hook, { target: specificTarget })
    expect(specificTarget.create.beforeResponse[0]).to.be.equal(hook)
  })
})
