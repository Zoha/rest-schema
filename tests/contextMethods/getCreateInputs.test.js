const { expect } = require("chai")
const getCreateInputs = require("../../src/restSchema/contextMethods/getCreateInputs")
const defaultField = require("../../src/restSchema/defaults/defaultField")
const createContext = require("../../src/restSchema/createContext")
const defaultSchemaRoutes = require("../../src/restSchema/defaults/schema/defaultSchemaRoutes")

describe("getCreateInputs method", function() {
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
      inputs,
      fields
    }
    const fieldsInputs = await getCreateInputs.call(context)

    expect(fieldsInputs)
      .to.haveOwnProperty("prop1")
      .that.equals("something")

    expect(context)
      .to.haveOwnProperty("createInputs")
      .that.is.an("object")
  })

  it("will not change context if setCreateInputs passed as false", async () => {
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
      inputs,
      fields
    }
    const fieldsInputs = await getCreateInputs.call(context, {
      setCreateInputs: false
    })

    expect(fieldsInputs)
      .to.haveOwnProperty("prop1")
      .that.equals("something")

    expect(context).to.not.haveOwnProperty("createInputs")
  })
})
