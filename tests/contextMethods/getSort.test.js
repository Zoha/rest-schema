const { expect } = require("chai")
const defaultRouteObject = require("../../src/restSchema/defaults/defaultRoute")
const getLimit = require("../../src/restSchema/contextMethods/getLimit")
const getSort = require("../../src/restSchema/contextMethods/getSort")
const getNestedField = require("../../src/restSchema/contextMethods/getNestedField")
const getFields = require("../../src/restSchema/contextMethods/getFields")

const context = {
  getNestedField,
  getFields,
  route: "create",
  routeObject: {
    ...defaultRouteObject
  },
  schema: {
    pagination: {
      limit: 10,
      sort: {}
    },
    fields: {
      prop1: {
        type: Number,
        sortable: {
          update: false
        }
      },
      prop2: {
        type: String,
        sortable: false
      },
      prop3: {
        type: String,
        sortable: () => false
      }
    }
  },
  inputs: {
    skip: 0
  },
  getLimit
}

describe("getSort method", () => {
  it("return correct sorts", async () => {
    let sort = await getSort.call({ ...context, inputs: { sort: "-prop1" } })
    expect(sort)
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
      .that.equals(-1)
    sort = await getSort.call({ ...context, inputs: { sort: "prop1" } })
    expect(sort)
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
      .that.equals(1)

    sort = await getSort.call({ ...context, inputs: { sort: "prop2" } })
    expect(sort)
      .to.be.an("object")
      .that.not.haveOwnProperty("prop2")
    sort = await getSort.call({ ...context, inputs: { sort: "prop3" } })
    expect(sort)
      .to.be.an("object")
      .that.not.haveOwnProperty("prop3")
  })
})
