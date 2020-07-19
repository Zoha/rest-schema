/* eslint-disable no-underscore-dangle */
const { expect } = require("chai")
const model = require("../../src/testHelpers/model")
const { schema: createSchema } = require("../../src/restSchema/index")
const ParentType = require("../../src/restSchema/customType")

class CustomType extends ParentType {
  async getFieldOptions() {
    return {
      trim: true
    }
  }
}

const customType = new CustomType()

const schema = {
  model,
  fields: {
    prop1: {
      type: customType,
      trim: false
    }
  },
  routeKeys: ["prop1", "prop3.nested", "_id"]
}

const ModelSchema = createSchema(model, schema.fields, { ...schema })

describe("custom type", () => {
  it("apply field options of custom type", async () => {
    const fields = await ModelSchema.tempContext.getFields()
    expect(
      Object.values(fields).find(i => i.key === "prop1").type instanceof CustomType
    ).to.be.equal(true)
    expect(Object.values(fields).find(i => i.key === "prop1").trim).to.be.equal(true)
  })
})
