const { expect } = require("chai")
const defaultRouteObject = require("../../src/restSchema/defaults/defaultRoute")
const getLimit = require("../../src/restSchema/contextMethods/getLimit")
const getSort = require("../../src/restSchema/contextMethods/getSort")
const getNestedField = require("../../src/restSchema/contextMethods/getNestedField")
const getFields = require("../../src/restSchema/contextMethods/getFields")
const defaults = require("../../src/restSchema/defaults")
const createContext = require("../../src/restSchema/createContext")
const schemaModelBuilder = require("../../src/restSchema/schema")
const model = require("../../src/testHelpers/model")
const { ObjectId } = require("../../src/restSchema/types")

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

  it("will return relation sorts", async () => {
    const schema1 = schemaModelBuilder(model, {
      prop1: {
        type: Number
      }
    })
    const schema2 = schemaModelBuilder(model, {
      prop1: {
        type: Number
      }
    })
    const schema3 = schemaModelBuilder(model, {
      prop1: {
        type: Number
      }
    })
    const schema4 = schemaModelBuilder(
      model,
      {
        normalProp: {
          type: String
        },
        notFilterable: {
          type: ObjectId,
          ref: schema1
        },
        relation: {
          type: ObjectId,
          ref: schema1,
          sortable: true
        },
        relationNested: {
          type: {
            nested: {
              type: ObjectId,
              ref: schema2,
              sortable: true
            }
          }
        },
        relationArrayNested: {
          type: [
            {
              nested: {
                type: ObjectId,
                ref: schema3,
                sortable: true
              }
            }
          ]
        },
        collectionRelation: {
          type: [ObjectId],
          ref: schema3,
          sortable: true
        }
      },
      {}
    )

    const { sort, relations } = await schema4.tempContext.getSort({
      inputs: {
        sort:
          "notExists normalProp relation.prop1 -relationNested.nested.prop1 relationArrayNested.0.nested.prop1 relationArrayNested.nested.prop1"
      },
      includeRelationSorts: true,
      includeRelationsInResult: true
    })

    expect(sort).to.not.haveOwnProperty("notExists")
    expect(sort.normalProp).to.be.equal(1)
    expect(sort).to.not.haveOwnProperty("notSortable.prop1")
    expect(sort["__relation.prop1"]).to.be.equal(1)
    expect(sort["__relationNested.nested.prop1"]).to.be.equal(-1)
    expect(sort["__relationArrayNested.0.nested.prop1"]).to.be.equal(1)
    expect(sort["__relationArrayNested.nested.prop1"]).to.be.equal(1)
    expect(Object.keys(sort)).to.have.lengthOf(5)
    expect(relations).to.be.an("array")
    expect(relations).to.have.lengthOf(3)
  })
})
