/* eslint-disable no-underscore-dangle */
const { expect } = require("chai")
const model = require("../../src/testHelpers/model")
const createContext = require("../../src/restSchema/createContext")
const schemaFormatter = require("../../src/restSchema/schemaFormatters/schemaFormatter")
const defaults = require("../../src/restSchema/defaults")

describe("getMessages method", function() {
  it("will return default messages", async () => {
    const schema = schemaFormatter({
      model
    })
    const context = await createContext(schema, { name: "delete" })
    const messages = await context.getMessages()
    expect(messages)
      .to.haveOwnProperty("validations")
      .that.is.an("object")
  })
  it("will return custom messages", async () => {
    const schema = schemaFormatter({
      model,
      defaults: {
        ...defaults,
        defaultMessages: {
          validations: {
            ok: "something"
          }
        }
      }
    })
    const context = await createContext(schema, { name: "delete" })
    const messages = await context.getMessages()
    expect(messages)
      .to.haveOwnProperty("validations")
      .that.is.an("object")
      .that.haveOwnProperty("ok")
      .that.equals("something")
  })
})
