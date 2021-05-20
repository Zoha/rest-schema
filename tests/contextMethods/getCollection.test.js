const { expect } = require("chai")
const model = require("../../src/testHelpers/model")
const getCollection = require("../../src/restSchema/contextMethods/getCollection")
const hook = require("../../src/restSchema/contextMethods/hook")
const createContext = require("../../src/restSchema/createContext")
const defaultRoute = require("../../src/restSchema/defaults/defaultRoute")
const defaultSchema = require("../../src/restSchema/defaults/defaultSchema")

const context = {
  ...createContext(
    {
      ...defaultSchema,
      hooks: {}
    },
    defaultRoute
  ),
  model,
  hook,
  route: "default",
  req: {
    query: {},
    body: {}
  }
}

describe("getCollection method", async () => {
  beforeEach(async () => {
    await model.deleteMany()
  })
  it("will get collection normally", async () => {
    await model.create({
      prop1: "something1"
    })
    await model.create({
      prop1: "something2"
    })

    let result = await getCollection.call(context)

    expect(result)
      .to.be.an("array")
      .that.have.lengthOf(2)

    result = await getCollection.call(
      {
        ...context,
        getFilters: async () => ({
          filters: { prop1: "something1" }
        })
      },
      { force: true }
    )

    expect(result)
      .to.be.an("array")
      .that.have.lengthOf(1)

    result = await getCollection.call(
      {
        ...context,
        getLimit: async () => 1
      },
      {
        force: true
      }
    )

    expect(result)
      .to.be.an("array")
      .that.have.lengthOf(1)

    result = await getCollection.call(
      {
        ...context,
        getSkip: async () => 1
      },
      {
        force: true
      }
    )

    expect(result)
      .to.be.an("array")
      .that.have.lengthOf(1)
  })

  // TODO check that will use aggregate if there is aggregate filtering
  // TODO check that will use aggregate if there is aggregate sorting
  // TODO check that will use aggregate if there is random sort
  // TODO check that will use aggregate if there is random loads
})
