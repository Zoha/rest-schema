const { expect } = require("chai")
const defaultField = require("../../src/restSchema/defaults/defaultField")
const getNestedField = require("../../src/restSchema/contextMethods/getNestedField")
const getFields = require("../../src/restSchema/contextMethods/getFields")

const context = {
  getFields,
  fields: {
    prop1: {
      ...defaultField,
      type: String
    },
    arrayNested: {
      ...defaultField,
      isNested: true,
      isArrayNested: true,
      type: Array,
      children: [
        {
          ...defaultField,
          type: String
        },
        {
          ...defaultField,
          type: Number
        }
      ]
    },
    objectNested: {
      ...defaultField,
      isNested: true,
      type: Object,
      isObjectNested: true,
      children: {
        prop1: {
          ...defaultField,
          type: Array,
          isNested: true,
          isArrayNested: true,
          children: [
            {
              ...defaultField,
              type: Number
            }
          ]
        },
        prop2: {
          ...defaultField,
          type: String
        }
      }
    }
  }
}

describe("getNestedField method", () => {
  it("will get all fields normally", async () => {
    const prop1 = await getNestedField.call(context, "prop1")
    const arrayNested = await getNestedField.call(context, "arrayNested")
    const arrayNestedProp1 = await getNestedField.call(context, "arrayNested.0")
    const arrayNestedProp2 = await getNestedField.call(context, "arrayNested.1")

    const objectNested = await getNestedField.call(context, "objectNested")
    const objectNestedProp1 = await getNestedField.call(context, "objectNested.prop1")
    const objectNestedProp1Prop1 = await getNestedField.call(context, "objectNested.prop1.0")
    const objectNestedProp2 = await getNestedField.call(context, "objectNested.prop2")

    expect(prop1)
      .to.be.an("object")
      .that.haveOwnProperty("type")
      .that.is.equal(String)

    expect(arrayNested)
      .to.be.an("object")
      .that.haveOwnProperty("type")
      .that.is.equal(Array)

    expect(arrayNestedProp1)
      .to.be.an("object")
      .that.haveOwnProperty("type")
      .that.is.equal(String)

    expect(arrayNestedProp2)
      .to.be.an("object")
      .that.haveOwnProperty("type")
      .that.is.equal(Number)

    expect(objectNested)
      .to.be.an("object")
      .that.haveOwnProperty("type")
      .that.is.equal(Object)

    expect(objectNestedProp1)
      .to.be.an("object")
      .that.haveOwnProperty("type")
      .that.is.equal(Array)
    expect(objectNestedProp1Prop1)
      .to.be.an("object")
      .that.haveOwnProperty("type")
      .that.is.equal(Number)

    expect(objectNestedProp2)
      .to.be.an("object")
      .that.haveOwnProperty("type")
      .that.is.equal(String)
  })
})
