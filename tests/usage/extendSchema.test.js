/* eslint-disable no-underscore-dangle */
const { expect } = require("chai")
const { schema } = require("../../src/restSchema")
const model = require("../../src/testHelpers/model")
const model2 = require("../../src/testHelpers/UserModel")

describe("extend method on schema builder", () => {
  it("will merge all fields and schema on schema", async () => {
    const sampleSchema = schema(
      model,
      {
        prop1: {
          type: String,
          default: "something"
        },
        prop2: {
          type: Number,
          default: 1
        },
        prop3: String
      },
      {
        routeKeys: ["something"]
      }
    )

    const result = sampleSchema.extend(
      model2,
      {
        prop1: {
          default: "something-else"
        },
        prop2: {
          type: String
        },
        prop3: null
      },
      {
        routeKeys: ["something-else"]
      }
    )

    const resultFields = await result.tempContext.getFields()
    expect(resultFields.prop1.type).to.be.equal(String)
    expect(resultFields.prop1.default).to.be.equal("something-else")
    expect(resultFields.prop2.type).to.be.equal(String)
    expect(!!resultFields.prop3).to.be.equal(false)

    expect(result.schema.routeKeys).to.have.lengthOf(2)
  })
})
