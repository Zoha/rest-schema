const { expect } = require("chai")
const createContext = require("../../src/restSchema/createContext")
const defaultRoute = require("../../src/restSchema/defaults/defaultRoute")
const defaultSchema = require("../../src/restSchema/defaults/defaultSchema")

const route = defaultRoute
const schema = {
  ...defaultSchema,
  fields: {
    prop1: String,
    prop2: {
      type: {
        nested: Number,
        nested2: Number
      }
    },
    prop3: [String, Number],
    prop4: {
      type: {
        nested: Number,
        nested2: Number
      }
    },
    prop5: {
      type: String,
      hideByDefault: true
    },
    prop6: {
      type: String,
      hide: () => {
        return true
      }
    }
  }
}

const context = createContext(schema, route)

context.resource = {
  prop1: "something",
  prop2: {
    nested: "something",
    nested2: "something"
  },
  prop3: ["1", "2"],
  prop4: {
    nested: "something",
    nested2: "something"
  },
  prop5: "something",
  prop6: "something"
}

describe("getSelectFields method", () => {
  it("returns just selected fields", async () => {
    context.inputs = {
      select: "prop1 prop3.1 prop2.nested"
    }

    const result = await context.getSelectFields()

    expect(result).to.haveOwnProperty("prop1")

    expect(result).to.haveOwnProperty("prop2")
    expect(result).to.haveOwnProperty("prop3")

    expect(result).to.not.haveOwnProperty("prop4")
    expect(result).to.not.haveOwnProperty("prop5")
    expect(result).to.not.haveOwnProperty("prop6")

    expect(result.prop2.children).to.be.an("object")

    expect(result.prop2.children.nested).to.be.an("object")
    expect(result.prop2.children).to.not.haveOwnProperty("nested2")

    expect(result.prop3.children)
      .to.be.an("array")
      .that.have.lengthOf(1)
    expect(result.prop3.children[0]).to.be.an("object")
  })

  it("will not select fields that have - before their field name", async () => {
    context.inputs = {
      select: "-prop1 -prop3.1 -prop2.nested2 -prop4"
    }

    const result = await context.getSelectFields()

    expect(result).to.not.haveOwnProperty("prop1")
    expect(result).to.haveOwnProperty("prop2")
    expect(result).to.haveOwnProperty("prop3")

    expect(result).to.not.haveOwnProperty("prop4")
    expect(result).to.not.haveOwnProperty("prop5")
    expect(result).to.not.haveOwnProperty("prop6")

    expect(result.prop2.children).to.be.an("object")

    expect(result.prop2.children.nested).to.be.an("object")
    expect(result.prop2.children).to.not.haveOwnProperty("nested2")

    expect(result.prop3.children)
      .to.be.an("array")
      .that.have.lengthOf(1)
    expect(result.prop3.children[0]).to.be.an("object")
    expect(result.prop3.children[0].key).to.be.equal("0")
  })

  it("do not hide fields that are hideByDefault if we want to", async () => {
    context.inputs = {
      select: "prop5 prop6"
    }

    const result = await context.getSelectFields()

    expect(result).to.haveOwnProperty("prop5")
    expect(result).to.not.haveOwnProperty("prop6")
  })

  it("returns selected fields with map type", async () => {
    const context = createContext(
      {
        ...defaultSchema,
        fields: {
          prop1: {
            type: Map,
            of: String
          }
        }
      },
      route
    )
    context.resource = {
      prop1: {
        nested1: 10,
        nested2: 12,
        nested3: 14
      }
    }
    context.inputs = {
      select: "prop1.nested1 prop1.nested2"
    }

    const result = await context.getSelectFields()

    expect(result)
      .to.haveOwnProperty("prop1")
      .that.haveOwnProperty("children")
      .that.not.haveOwnProperty("nested3")

    expect(result.prop1.children.nested1).to.be.an("object")
    expect(result.prop1.children.nested2).to.be.an("object")
  })

  it("returns some fields without any select", async () => {
    const context = createContext(
      {
        ...defaultSchema,
        fields: {
          prop1: {
            type: Map,
            of: String
          }
        }
      },
      route
    )
    context.resource = {
      prop1: {
        nested1: 10,
        nested2: 12,
        nested3: 14
      }
    }
    context.inputs = {
      select: undefined
    }

    const result = await context.getSelectFields()

    expect(result).to.haveOwnProperty("prop1")

    expect(result.prop1.children.nested1).to.be.an("object")
    expect(result.prop1.children.nested2).to.be.an("object")
  })
})
