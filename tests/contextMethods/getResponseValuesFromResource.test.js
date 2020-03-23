const { expect } = require("chai")
const getResponseValuesFromResource = require("../../src/restSchema/contextMethods/getResponseValuesFromResource")
const model = require("../../src/testHelpers/model")
const createContext = require("../../src/restSchema/createContext")
const defaultSchema = require("../../src/restSchema/defaults/defaultSchema")
const defaultRoute = require("../../src/restSchema/defaults/defaultRoute")

const context = createContext(
  {
    ...defaultSchema,
    fields: {
      prop1: String
    }
  },
  defaultRoute
)

context.req = {
  query: {},
  params: {},
  body: {}
}
context.route = "create"

describe("getResponseValuesFromResource method", () => {
  beforeEach(async () => {
    await model.deleteMany()
  })

  it("will return response values normally", async () => {
    const resource = await model.create({
      prop1: "something",
      prop2: "something"
    })
    const values = await getResponseValuesFromResource.call({
      ...context,
      resource
    })

    expect(values)
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
    expect(values).to.not.haveOwnProperty("prop2")
  })

  it("will return array and object responses", async () => {
    const resource = await model.create({
      prop1: {
        nested1: "something",
        nested2: {
          nested: "2",
          nested2: "3"
        },
        nested3: "something"
      },
      prop2: [
        "2",
        {
          nested: "3"
        }
      ]
    })
    const values = await getResponseValuesFromResource.call({
      ...context,
      resource,
      schema: {
        fields: {
          prop1: {
            type: {
              nested1: String,
              nested2: {
                type: {
                  nested: Number
                }
              }
            }
          },
          prop2: [
            Number,
            {
              type: {
                nested: Number
              }
            }
          ],
          prop3: {
            type: {
              nested: String
            },
            default: () => ({})
          }
        }
      }
    })

    expect(values)
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
    expect(values.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("nested1")
    expect(values.prop1.nested1)
      .to.be.an("string")
      .that.equals("something")
    expect(values.prop1.nested2)
      .to.be.an("object")
      .that.haveOwnProperty("nested")
      .that.is.a("number")
      .that.equals(2)
    expect(values.prop1.nested2).that.not.haveOwnProperty("nested2")
    expect(values.prop1).to.not.haveOwnProperty("nested3")

    expect(values)
      .to.haveOwnProperty("prop2")
      .that.is.an("array")
      .that.have.lengthOf(2)

    expect(values.prop2[0])
      .to.be.a("number")
      .that.equals(2)
    expect(values.prop2[1])
      .to.be.a("object")
      .that.haveOwnProperty("nested")
      .that.is.a("number")
      .that.equals(3)

    expect(values)
      .to.haveOwnProperty("prop3")
      .that.is.an("object")
  })

  it("will get data with get method", async () => {
    const resource = await model.create()
    const values = await getResponseValuesFromResource.call({
      ...context,
      resource,
      schema: {
        fields: {
          prop1: {
            type: String,
            default: "ok"
          },
          prop2: {
            type: String,
            default: {
              create: () => "ok"
            }
          },
          prop3: {
            type: String,
            default: {
              update: () => "ok"
            }
          }
        }
      }
    })

    expect(values)
      .to.haveOwnProperty("prop1")
      .that.equals("ok")
    expect(values)
      .to.haveOwnProperty("prop2")
      .that.equals("ok")
    expect(values).to.not.haveOwnProperty("prop3")
  })
})
