/* eslint-disable no-underscore-dangle */
const { expect } = require("chai")
const deleteResource = require("../../src/restSchema/contextMethods/deleteResource")
const model = require("../../src/testHelpers/model")
const createContext = require("../../src/restSchema/createContext")
const schemaFormatter = require("../../src/restSchema/schemaFormatters/schemaFormatter")

const schema = schemaFormatter({
  model
})

describe("deleteResource method", function() {
  beforeEach(async () => {
    await model.deleteMany({})
  })
  it("will delete resource normally", async () => {
    const resource = await model.create({ prop1: "something" })
    const context = await createContext(schema, { name: "delete" })
    context.req = {
      params: {
        id: resource._id.toString()
      }
    }

    await deleteResource.call(context)

    expect(context).to.haveOwnProperty("deletedResource")
    expect(context).to.haveOwnProperty("resource")

    const dbResources = await model.find()
    expect(dbResources).to.have.lengthOf(0)
  })
})
