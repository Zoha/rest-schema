const { expect } = require("chai")
const createContext = require("../../src/restSchema/createContext")
const defaultRoute = require("../../src/restSchema/defaults/defaultRoute")
const defaultSchema = require("../../src/restSchema/defaults/defaultSchema")
const { ObjectId } = require("../../src/restSchema/types")
const model = require("../../src/testHelpers/model")

// TODO check with load relations (returns data in final resource) for resource relation
// TODO check with load relations (returns data in final resource) for collection relation
// TODO will load relations in nested arrays (nested in item of arrays) [{relationItem : something}]
// TODO check that will return null if does not exist

describe("getAggregateResource method", () => {
  it("check that loads relations", async () => {
    const context = createContext(
      {
        ...defaultSchema,
        model,
        fields: {
          prop1: {
            type: ObjectId,
            ref: "something",
            loadable: true
          }
        }
      },
      defaultRoute
    )

    context.inputs = {
      load: "prop1"
    }

    const result = await context.getAggregateResource()

    expect(result).to.have.lengthOf(3)
  })
})
