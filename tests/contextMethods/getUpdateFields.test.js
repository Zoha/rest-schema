const { expect } = require("chai")
const getUpdateFields = require("../../src/restSchema/contextMethods/getUpdateFields")
const defaultField = require("../../src/restSchema/defaults/defaultField")

const fields = {
  notUpdatable: {
    ...defaultField,
    updatable: false
  },
  updatable: {
    ...defaultField
  },
  notUpdatableObject: {
    ...defaultField,
    isNested: true,
    children: {
      nested: {
        ...defaultField
      }
    },
    updatable: false
  },
  updatableObject: {
    ...defaultField,
    isNested: true,
    isObjectNested: true,
    children: {
      notUpdatableNested: {
        ...defaultField,
        type: String,
        updatable: false
      },
      updatableNested: {
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

describe("getUpdateFields method", function() {
  it("will getUpdateFields normally", async () => {
    const context = {
      fields
    }
    const updateFields = await getUpdateFields.call(context)
    expect(updateFields)
      .to.be.an("object")
      .and.haveOwnProperty("updatable")
    expect(updateFields).not.haveOwnProperty("notUpdatable")
    expect(updateFields).not.haveOwnProperty("notUpdatableObject")
    expect(updateFields)
      .to.haveOwnProperty("updatableObject")
      .that.haveOwnProperty("children")
      .that.haveOwnProperty("updatableNested")
    expect(updateFields.updatableObject.children).to.not.haveOwnProperty("notUpdatableNested")
    expect(updateFields)
      .to.haveOwnProperty("undefinedChildren")
      .that.haveOwnProperty("children")
  })
})
