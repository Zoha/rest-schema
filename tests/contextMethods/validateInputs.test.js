const { expect } = require("chai")
const validateInput = require("../../src/restSchema/contextMethods/validateInput")
const validateInputs = require("../../src/restSchema/contextMethods/validateInputs")
const getFields = require("../../src/restSchema/contextMethods/getFields")
const getMessages = require("../../src/restSchema/contextMethods/getMessages")
const defaults = require("../../src/restSchema/defaults")

const context = {
  route: "create",
  validateInput,
  getFields,
  getMessages,
  defaults,
  findLocationOfInput() {
    return "body"
  }
}

describe("validateInputs method", () => {
  it("validate fields normally", async () => {
    const contextWithSchema = {
      ...context,
      schema: {
        fields: {
          prop1: {
            required: true
          },
          prop2: {
            type: [
              {
                required: true,
                type: Number
              }
            ]
          },
          prop3: [
            {
              required: true,
              type: Number
            }
          ],
          prop4: {
            type: {
              nested: {
                required: true
              }
            }
          }
        }
      }
    }

    const validateResult = await validateInputs.call({
      ...contextWithSchema,
      inputs: {
        prop2: [null],
        prop4: {}
      }
    })

    expect(validateResult)
      .to.be.an("array")
      .that.have.lengthOf(3)

    expect(validateResult[0])
      .to.haveOwnProperty("field")
      .that.equals("prop1")
    expect(validateResult[0])
      .to.haveOwnProperty("value")
      .that.equals(undefined)
    expect(validateResult[0])
      .to.haveOwnProperty("location")
      .that.equals("body")
    expect(validateResult[0])
      .to.haveOwnProperty("message")
      .that.equals("prop1 is required")

    expect(validateResult[1])
      .to.haveOwnProperty("field")
      .that.equals("prop2.0")
    expect(validateResult[1])
      .to.haveOwnProperty("value")
      .that.equals(null)
    expect(validateResult[1])
      .to.haveOwnProperty("location")
      .that.equals("body")
    expect(validateResult[1])
      .to.haveOwnProperty("message")
      .that.equals("prop2.0 is required")

    expect(validateResult[2])
      .to.haveOwnProperty("field")
      .that.equals("prop4.nested")
    expect(validateResult[2])
      .to.haveOwnProperty("value")
      .that.equals(undefined)
    expect(validateResult[2])
      .to.haveOwnProperty("location")
      .that.equals("body")
    expect(validateResult[2])
      .to.haveOwnProperty("message")
      .that.equals("prop4.nested is required")
  })

  it("validate fields with map type", async () => {
    const contextWithSchema = {
      ...context,
      schema: {
        fields: {
          prop1: {
            type: Map,
            of: {
              type: String,
              validate(val) {
                return val == "ok"
              }
            }
          }
        }
      }
    }

    const validateResult = await validateInputs.call({
      ...contextWithSchema,
      inputs: {
        prop1: {
          nested1: "ok",
          nested2: "nok"
        }
      }
    })

    expect(validateResult)
      .to.be.an("array")
      .that.have.lengthOf(1)

    expect(validateResult[0].field).to.be.equal("prop1.nested2")
  })

  it("will not required if check required was false", async () => {
    const contextWithSchema = {
      ...context,
      schema: {
        fields: {
          prop1: {
            type: String,
            required: true
          }
        }
      }
    }

    const validateResult = await validateInputs.call(
      {
        ...contextWithSchema,
        inputs: {}
      },
      {
        checkRequired: false
      }
    )

    expect(validateResult)
      .to.be.an("array")
      .that.have.lengthOf(0)
  })
})
