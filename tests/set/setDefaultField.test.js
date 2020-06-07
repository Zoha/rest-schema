const { setDefaultField } = require("../../src/restSchema/set")
const { expect } = require("chai")

describe("set default field", () => {
  it("will set default field props", () => {
    const specificTarget = { type: Object }
    expect(specificTarget.type).to.not.be.equal(String)
    setDefaultField(
      {
        type: String
      },
      { target: specificTarget }
    )
    expect(specificTarget.type).to.be.equal(String)
  })
})
