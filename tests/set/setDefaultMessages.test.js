const { setDefaultMessages, setDefaultValidationMessages } = require("../../src/restSchema/set")
const { expect } = require("chai")
const { defaultMessages } = require("../../src/restSchema/defaults")
const deepClone = require("clone-deep")

describe("set default messages", () => {
  it("will set default messages", () => {
    const target = deepClone(defaultMessages)
    expect(target.resourceNotFound)
      .to.be.an("string")
      .and.to.not.include("oops")

    expect(target.validations.between)
      .to.be.an("string")
      .and.to.not.include("oops")

    expect(target.validations.max).to.be.an("string")

    setDefaultMessages(
      {
        validations: {
          between: "oops"
        },
        resourceNotFound: "oops"
      },
      { target }
    )
    expect(target.resourceNotFound).to.include("oops")
    expect(target.validations.between).to.include("oops")
    expect(target.validations.max)
      .to.be.an("string")
      .and.to.not.include("oops")
  })

  it("will set default validation messages without specific target", () => {
    const target = deepClone(defaultMessages.validations)

    expect(target.max)
      .to.be.an("string")
      .and.to.not.include("oops")

    setDefaultValidationMessages(
      {
        max: "oops"
      },
      { target }
    )
    expect(target.max).to.include("oops")
  })
})
