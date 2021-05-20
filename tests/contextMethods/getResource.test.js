/* eslint-disable no-underscore-dangle */
const { expect } = require("chai")
const getResource = require("../../src/restSchema/contextMethods/getResource")
const model = require("../../src/testHelpers/model")
const defaultRoute = require("../../src/restSchema/defaults/defaultRoute")
const { ObjectId } = require("../../src/restSchema/types")
const createContext = require("../../src/restSchema/createContext")

const context = {
  ...createContext(
    {
      fields: {
        prop1: String
      },
      filters: {},
      hooks: {}
    },
    defaultRoute
  ),
  model,
  getRoutes: () => [defaultRoute],
  getRouteKeys: () => ["prop1", "_id"],
  req: {
    params: {
      id: "prop1"
    }
  },
  route: "create"
}

describe("getResource method", () => {
  beforeEach(async () => {
    await model.deleteMany()
  })

  it("will return resource normally", async () => {
    await model.create({
      prop1: "prop1"
    })

    let result = await getResource.call(context)
    result = result.toObject()
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("_id")

    result = await getResource.call({
      ...context,
      fields: undefined,
      req: {
        params: { id: result._id.toString() }
      },
      schema: {
        hooks: {},
        fields: {
          _id: ObjectId,
          prop1: String
        },
        filters: {}
      }
    })

    result = result.toObject()
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("_id")
  })

  it("will return resource with changing the type", async () => {
    await model.create({
      prop1: "1"
    })

    let result = await getResource.call({
      ...context,
      fields: undefined,
      req: {
        params: { id: "1" }
      },
      schema: {
        hooks: {},
        fields: {
          prop1: String
        },
        filters: {}
      }
    })

    result = result.toObject()
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("_id")
  })

  it("will return resource with nested property", async () => {
    await model.create({
      prop1: {
        nested: 1
      }
    })

    let result = await getResource.call({
      ...context,
      fields: undefined,
      getRouteKeys: () => ["prop1.nested"],
      req: {
        params: { id: "1" }
      },
      schema: {
        hooks: {},
        fields: {
          prop1: {
            type: {
              nested: Number
            }
          }
        },
        filters: {}
      }
    })

    result = result.toObject()
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("_id")
  })

  // TODO check that will use aggregate if there is loads
})
