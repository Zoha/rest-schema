const { expect } = require("chai")
const model = require("../../src/testHelpers/model")
const getCollection = require("../../src/restSchema/contextMethods/getCollection")
const hook = require("../../src/restSchema/contextMethods/hook")

const context = {
  schema: {
    hooks: {}
  },
  model,
  hook,
  route: "default",
  getFilters: async () => ({}),
  getLimit: async () => 5,
  getSkip: async () => 0
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
          prop1: "something1"
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
})
