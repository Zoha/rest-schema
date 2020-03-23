const { expect } = require("chai")
const validateInput = require("../../src/restSchema/contextMethods/validateInput")
const validateInputs = require("../../src/restSchema/contextMethods/validateInputs")
const getFields = require("../../src/restSchema/contextMethods/getFields")

const context = {
  route: "create",
  validateInput,
  getFields,
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
})
