const { expect } = require("chai")
const defaultRouteObject = require("../../src/restSchema/defaults/defaultRoute")
const getLimit = require("../../src/restSchema/contextMethods/getLimit")
const getSkip = require("../../src/restSchema/contextMethods/getSkip")

const context = {
  routeObject: {
    ...defaultRouteObject
  },
  schema: {
    pagination: {
      limit: 10
    }
  },
  inputs: {
    skip: 0
  },
  getLimit
}

describe("getSkip method", () => {
  it("return correct skip", async () => {
    let skip = getSkip.call(context)
    expect(skip).to.be.equal(0)
    skip = getSkip.call({ ...context, inputs: { skip: 10 } })
    expect(skip).to.be.equal(10)
    skip = getSkip.call({ ...context, inputs: { page: 3 } })
    expect(skip).to.be.equal(20)
    skip = getSkip.call({ ...context, inputs: { skip: 10, page: 3 } })
    expect(skip).to.be.equal(10)

    // with predefined skip
    skip = getSkip.call({
      ...context,
      schema: { pagination: { skip: 30 } }
    })
    expect(skip).to.be.equal(30)

    // with changed name of meta

    skip = getSkip.call({
      ...context,
      routeObject: {
        ...context.routeObject,
        meta: {
          ...context.routeObject.meta,
          skip: "offs"
        }
      },
      inputs: { offs: 30 }
    })
    expect(skip).to.be.equal(30)
  })
})
