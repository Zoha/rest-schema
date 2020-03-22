const getFields = require("../../src/restSchema/contextMethods/getFields")
const { expect } = require("chai")

const context = {
  schema: {
    fields: {
      prop1: String
    }
  }
}

describe("getFields method", () => {
  it("will get fields normally", async () => {
    const fields = await getFields.call(context)
    expect(fields).to.be.an("object")
    expect(fields.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("type")
      .that.equal(String)
    expect(fields.prop1)
      .that.haveOwnProperty("isNested")
      .that.equal(false)
    expect(fields.prop1)
      .that.haveOwnProperty("key")
      .that.equal("prop1")
  })

  it("will get fields array nested", async () => {
    const fields = await getFields.call({
      ...context,
      schema: {
        fields: {
          prop1: [
            String,
            {
              type: [Number]
            }
          ]
        }
      }
    })

    expect(fields).to.be.an("object")
    expect(fields.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("type")
      .that.equal(Array)
    expect(fields.prop1)
      .that.haveOwnProperty("isNested")
      .that.equal(true)
    expect(fields.prop1)
      .that.haveOwnProperty("key")
      .that.equal("prop1")
    expect(fields.prop1.children)
      .to.be.an("array")
      .that.have.lengthOf(2)
    expect(fields.prop1.children[0])
      .to.be.an("object")
      .that.haveOwnProperty("key")
      .that.equal("0")
    expect(fields.prop1.children[0])
      .that.haveOwnProperty("type")
      .that.equal(String)
    expect(fields.prop1.children[1])
      .to.be.an("object")
      .that.haveOwnProperty("key")
      .that.equal("1")
    expect(fields.prop1.children[1])
      .that.haveOwnProperty("type")
      .that.equal(Array)
    expect(fields.prop1.children[1])
      .that.haveOwnProperty("isNested")
      .that.equal(true)
    expect(fields.prop1.children[1].children)
      .to.be.an("array")
      .that.have.lengthOf(1)
    expect(fields.prop1.children[1].children[0])
      .to.be.an("object")
      .that.haveOwnProperty("key")
      .that.equals("0")
    expect(fields.prop1.children[1].children[0])
      .to.haveOwnProperty("type")
      .that.equals(Number)
  })

  it("will get fields array nested", async () => {
    const fields = await getFields.call({
      ...context,
      schema: {
        fields: {
          prop1: {
            type: {
              nested1: String,
              nested2: {
                type: Number
              },
              nested3: [String],
              nested4: {
                type: {
                  nested: String
                }
              }
            }
          }
        }
      }
    })

    expect(fields).to.be.an("object")
    expect(fields.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("type")
      .that.equals(Object)
    expect(fields.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("type")
      .that.equals(Object)
    expect(fields.prop1)
      .to.haveOwnProperty("children")
      .that.is.an("Object")
    expect(fields.prop1.children)
      .to.haveOwnProperty("nested1")
      .that.is.an("Object")
      .that.haveOwnProperty("type")
      .that.equal(String)
    expect(fields.prop1.children)
      .to.haveOwnProperty("nested2")
      .that.is.an("Object")
      .that.haveOwnProperty("type")
      .that.equal(Number)
    expect(fields.prop1.children)
      .to.haveOwnProperty("nested3")
      .that.is.an("Object")
      .that.haveOwnProperty("type")
      .that.equal(Array)
    expect(fields.prop1.children.nested3.children)
      .to.be.an("array")
      .that.have.lengthOf(1)
    expect(fields.prop1.children.nested3.children[0])
      .to.be.an("object")
      .that.have.ownProperty("type")
      .that.equal(String)
    expect(fields.prop1.children)
      .to.haveOwnProperty("nested4")
      .that.is.an("Object")
      .that.haveOwnProperty("type")
      .that.equal(Object)
    expect(fields.prop1.children.nested4.children)
      .to.haveOwnProperty("nested")
      .that.is.an("Object")
      .that.haveOwnProperty("type")
      .that.equal(String)
  })

  it("will get fields with callback", async () => {
    const fields = await getFields.call({
      ...context,
      schema: {
        fields: async context => {
          return {
            prop1: context => {
              return String
            }
          }
        }
      }
    })

    expect(fields)
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
      .that.is.an("object")
      .that.haveOwnProperty("type")
      .that.equals(String)
  })
})
