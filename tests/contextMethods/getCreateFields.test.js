const { expect } = require("chai")
const getCreateFields = require("../../src/restSchema/contextMethods/getCreateFields")
const defaultField = require("../../src/restSchema/defaults/defaultField")
const getFields = require("../../src/restSchema/contextMethods/getFields")

const fields = {
  notCreatable: {
    ...defaultField,
    creatable: false
  },
  creatable: {
    ...defaultField
  },
  notCreatableObject: {
    ...defaultField,
    isNested: true,
    children: {
      nested: {
        ...defaultField
      }
    },
    creatable: false
  },
  creatableObject: {
    ...defaultField,
    isNested: true,
    isObjectNested: true,
    children: {
      notCreatableNested: {
        ...defaultField,
        type: String,
        creatable: false
      },
      creatableNested: {
        ...defaultField,
        type: String
      }
    }
  },
  undefinedChildren: {
    ...defaultField,
    children: undefined,
    isNested: true
  }
}

describe("getCreateFields method", function() {
  it("will getCreateFields normally", async () => {
    const context = {
      fields,
      getFields
    }
    const createFields = await getCreateFields.call(context)
    expect(createFields)
      .to.be.an("object")
      .and.haveOwnProperty("creatable")
    expect(createFields).not.haveOwnProperty("notCreatable")
    expect(createFields).not.haveOwnProperty("notCreatableObject")
    expect(createFields)
      .to.haveOwnProperty("creatableObject")
      .that.haveOwnProperty("children")
      .that.haveOwnProperty("creatableNested")
    expect(createFields.creatableObject.children).to.not.haveOwnProperty("notCreatableNested")
    expect(createFields)
      .to.haveOwnProperty("undefinedChildren")
      .that.haveOwnProperty("children")
  })
})
