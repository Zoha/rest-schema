const { expect } = require("chai")
const defaultField = require("../../src/restSchema/defaults/defaultField")
const cast = require("../../src/restSchema/helpers/cast")
const getCreateFields = require("../../src/restSchema/contextMethods/getCreateFields")
const getInputsFromFields = require("../../src/restSchema/contextMethods/getInputsFromFields")
const getFields = require("../../src/restSchema/contextMethods/getFields")
const defaults = require("../../src/restSchema/defaults")
const getResource = require("../../src/restSchema/contextMethods/getResource")
const getDirtyInputs = require("../../src/restSchema/contextMethods/getDirtyInputs")

describe("getDirtyInputs method", function() {
  it("will get dirty inputs normally", async () => {
    const fields = {
      prop1: {
        ...defaultField
      }
    }

    const inputs = {
      prop1: "something",
      prop2: "same"
    }
    const context = {
      resource: { prop1: "something-else", prop2: "same" },
      getMessages: () => ({}),
      hook: () => ({}),
      getResource,
      fields,
      inputs,
      getCreateFields,
      getInputsFromFields,
      getFields,
      cast,
      defaults
    }
    const dirtyInputs = await getDirtyInputs.call(context)

    expect(dirtyInputs)
      .to.haveOwnProperty("prop1")
      .that.equals("something")

    expect(dirtyInputs).to.not.haveOwnProperty("prop2")

    expect(context)
      .to.haveOwnProperty("dirtyInputs")
      .that.is.equal(dirtyInputs)
  })
})
