const { expect } = require("chai")
const getUpdateInputs = require("../../src/restSchema/contextMethods/getUpdateInputs")
const defaultField = require("../../src/restSchema/defaults/defaultField")
const cast = require("../../src/restSchema/helpers/cast")
const getUpdateFields = require("../../src/restSchema/contextMethods/getUpdateFields")
const getInputsFromFields = require("../../src/restSchema/contextMethods/getInputsFromFields")
const getFields = require("../../src/restSchema/contextMethods/getFields")
const defaults = require("../../src/restSchema/defaults")
const getInputs = require("../../src/restSchema/contextMethods/getInputs")
const createContext = require("../../src/restSchema/createContext")
const defaultSchemaRoutes = require("../../src/restSchema/defaults/schema/defaultSchemaRoutes")

describe("getUpdateInputs method", function() {
  it("will get inputs normally", async () => {
    const fields = {
      prop1: {
        ...defaultField
      }
    }

    const inputs = {
      prop1: "something"
    }
    const context = {
      ...createContext({}, defaultSchemaRoutes.create),
      route: "create",
      inputs,
      fields
    }
    const fieldsInputs = await getUpdateInputs.call(context)

    expect(fieldsInputs)
      .to.haveOwnProperty("prop1")
      .that.equals("something")

    expect(context)
      .to.haveOwnProperty("updateInputs")
      .that.is.an("object")
  })

  it("will not change context if setUpdateInputs passed as false", async () => {
    const fields = {
      prop1: {
        ...defaultField
      }
    }

    const inputs = {
      prop1: "something"
    }
    const context = {
      ...createContext({}, defaultSchemaRoutes.create),
      route: "create",
      inputs,
      fields
    }
    const fieldsInputs = await getUpdateInputs.call(context, {
      setUpdateInputs: false
    })

    expect(fieldsInputs)
      .to.haveOwnProperty("prop1")
      .that.equals("something")

    expect(context).to.not.haveOwnProperty("updateInputs")
  })
})
