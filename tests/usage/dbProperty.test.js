const { expect } = require("chai")
const createContext = require("../../src/restSchema/createContext")
const defaultSchemaRoutes = require("../../src/restSchema/defaults/schema/defaultSchemaRoutes")

describe("test db property on field", () => {
  it("does not save property in database if db property was false", async () => {
    const schema = {
      fields: {
        someField: {
          type: String,
          db: false,
          creatable: true,
          updatable: true
        }
      }
    }
    const context = createContext(schema, defaultSchemaRoutes.create)

    const targetField = await context.getNestedField({ key: "someField" })

    expect(targetField.db).to.be.equal(false)
    expect(targetField.creatable).to.be.equal(false)
    expect(targetField.updatable).to.be.equal(false)

    const inputs = await context.getCreateInputs({
      inputs: {
        someField: "something"
      }
    })

    expect(!!inputs.someField).to.be.equal(false)
  })
})
