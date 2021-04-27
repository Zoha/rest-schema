const {
  setDefaultRoute,
  setDefaultRouteMeta,
  setDefaultRouteFilteringOperators
} = require("../../src/restSchema/set")
const { expect } = require("chai")
const { defaultRoute } = require("../../src/restSchema/defaults")
const deepClone = require("clone-deep")

describe("set default route", () => {
  it("change default route data", () => {
    const target = deepClone(defaultRoute)
    expect(target.method).to.be.equal("get")
    expect(target.inputsTarget).to.have.lengthOf(2)
    expect(target.meta.skip).to.be.equal("skip")
    expect(target.meta.page).to.be.equal("page")

    setDefaultRoute(
      {
        method: "post",
        inputsTarget: ["body"],
        meta: {
          skip: "offset"
        }
      },
      {
        target
      }
    )

    expect(target.method).to.be.equal("post")
    expect(target.inputsTarget).to.have.lengthOf(1)
    expect(target.meta.skip).to.be.equal("offset")
    expect(target.meta.page).to.be.equal("page")
  })

  it("change default operators of route with merge", () => {
    const target = deepClone(defaultRoute)

    setDefaultRoute(
      {
        filteringOperators: {
          $eq: "somethingElse"
        }
      },
      {
        target
      }
    )

    expect(target.filteringOperators["$eq"]).to.be.equal("somethingElse")

    expect(target.filteringOperators["$gt"]).to.be.a("function")
  })

  it("change default operators of route without merge", () => {
    const target = deepClone(defaultRoute)

    setDefaultRoute(
      {
        filteringOperators: {
          $eq: "somethingElse"
        }
      },
      {
        mergeFilteringOperators: false,
        target
      }
    )

    expect(target.filteringOperators["$eq"]).to.be.equal("somethingElse")

    expect(target.filteringOperators["$gt"]).to.be.equal(undefined)
  })

  it("change default operators with its own method", () => {
    const target = deepClone(defaultRoute.filteringOperators)

    setDefaultRouteFilteringOperators(
      {
        $eq: "somethingElse"
      },
      {
        target
      }
    )

    expect(target["$eq"]).to.be.equal("somethingElse")
  })

  it("change default meta with its own method", () => {
    const target = deepClone(defaultRoute.meta)
    setDefaultRouteMeta(
      {
        skip: "oops"
      },
      {
        target
      }
    )

    expect(target.skip).to.be.equal("oops")
  })
})
