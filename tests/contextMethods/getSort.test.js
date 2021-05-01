const { expect } = require("chai")
const defaultRouteObject = require("../../src/restSchema/defaults/defaultRoute")
const getLimit = require("../../src/restSchema/contextMethods/getLimit")
const getSort = require("../../src/restSchema/contextMethods/getSort")
const getNestedField = require("../../src/restSchema/contextMethods/getNestedField")
const getFields = require("../../src/restSchema/contextMethods/getFields")
const defaults = require("../../src/restSchema/defaults")
const createContext = require("../../src/restSchema/createContext")

const context = {
  ...createContext(
    {},
    {
      ...defaultRouteObject
    }
  ),
  getNestedField,
  getFields,
  route: "create",
  defaults,
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

  it("return correct sorts with object", async () => {
    let sort = await getSort.call({ ...context, inputs: { sort: { prop1: -1 } } })
    expect(sort)
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
      .that.equals(-1)
    sort = await getSort.call({ ...context, inputs: { sort: { prop1: 1 } } })
    expect(sort)
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
      .that.equals(1)

    sort = await getSort.call({ ...context, inputs: { sort: { prop2: 1 } } })
    expect(sort)
      .to.be.an("object")
      .that.not.haveOwnProperty("prop2")
    sort = await getSort.call({ ...context, inputs: { sort: { prop3: 1 } } })
    expect(sort)
      .to.be.an("object")
      .that.not.haveOwnProperty("prop3")
  })

  it("return correct sorts with function sortable", async () => {
    let sort = await getSort.call({
      ...context,
      schema: {
        ...context.schema,
        fields: {
          prop1: {
            type: String,
            sortable() {
              return true
            }
          }
        }
      },
      inputs: { sort: { prop1: -1 } }
    })
    expect(sort)
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
      .that.equals(-1)

    sort = await getSort.call({
      ...context,
      schema: {
        ...context.schema,
        fields: {
          prop1: {
            type: String,
            sortable() {
              return false
            }
          }
        }
      },
      inputs: { sort: { prop1: -1 } }
    })
    expect(sort)
      .to.be.an("object")
      .that.not.haveOwnProperty("prop1")

    sort = await getSort.call({
      ...context,
      schema: {
        ...context.schema,
        fields: {
          prop1: {
            type: String,
            sortable: {
              create() {
                return false
              }
            }
          }
        }
      },
      inputs: { sort: { prop1: -1 } }
    })
    expect(sort)
      .to.be.an("object")
      .that.not.haveOwnProperty("prop1")

    sort = await getSort.call({
      ...context,
      schema: {
        ...context.schema,
        fields: {
          prop1: {
            type: String,
            sortable: {
              create() {
                return true
              }
            }
          }
        }
      },
      inputs: { sort: { prop1: -1 } }
    })
    expect(sort)
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
  })
})
