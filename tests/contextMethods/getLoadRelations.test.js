const { expect } = require("chai")
const createContext = require("../../src/restSchema/createContext")
const defaultRoute = require("../../src/restSchema/defaults/defaultRoute")
const defaultSchema = require("../../src/restSchema/defaults/defaultSchema")
const { ObjectId } = require("../../src/restSchema/types")

describe("getLoadRelations method", () => {
  it("will return relations for load query item", async () => {
    const context = createContext(
      {
        ...defaultSchema,
        fields: {
          prop1: {
            type: ObjectId,
            ref: "something",
            loadable: true
          },
          hidedProp: {
            type: ObjectId,
            loadable: true,
            ref: "something",
            hide: true
          },
          notLoadableProp: {
            type: ObjectId,
            ref: "something",
            loadable: false
          }
        }
      },
      defaultRoute
    )

    context.inputs = {
      load: "prop1 hidedProp notLoadableProp"
    }

    const loadRelations = await context.getLoadRelations()

    expect(loadRelations).to.have.lengthOf(1)
    expect(loadRelations[0].fieldName).to.be.equal("prop1")
  })
})
