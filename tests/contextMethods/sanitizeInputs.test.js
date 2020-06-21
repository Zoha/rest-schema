const { expect } = require("chai")
const sanitizeInput = require("../../src/restSchema/contextMethods/sanitizeInput")
const sanitizeInputs = require("../../src/restSchema/contextMethods/sanitizeInputs")
const getFields = require("../../src/restSchema/contextMethods/getFields")
const cast = require("../../src/restSchema/contextMethods/cast")
const defaults = require("../../src/restSchema/defaults")

const context = {
  route: "create",
  cast,
  sanitizeInput,
  getFields,
  defaults
}

describe("sanitizeInputs method", () => {
  it("will apply sanitizers normally", async () => {
    const sanitized = await sanitizeInputs.call({
      ...context,
      schema: {
        fields: {
          prop1: {
            type: String,
            lowercase: true,
            trim: true,
            sanitize: (val, ctx) => {
              return `${val}-${ctx.route}`
            }
          },
          prop2: [
            {
              type: String,
              lowercase: true,
              trim: true,
              sanitize: (val, ctx) => {
                return `${val}-${ctx.route}`
              }
            }
          ],
          prop3: {
            type: {
              nested: {
                type: String,
                uppercase: true,
                trim: true,
                sanitize: (val, ctx) => {
                  return `${val}-${ctx.route}`
                }
              }
            }
          }
        }
      },
      inputs: {
        prop1: " HELLO ",
        prop2: ["  HELLO  "],
        prop3: {
          nested: "hello   "
        }
      }
    })

    expect(sanitized)
      .to.haveOwnProperty("prop1")
      .to.be.equal("hello-create")
    expect(sanitized)
      .to.haveOwnProperty("prop2")
      .that.is.an("array")
    expect(sanitized.prop2[0]).to.be.equal("hello-create")
    expect(sanitized.prop3)
      .to.haveOwnProperty("nested")
      .to.be.equal("HELLO-create")
  })

  it("will sanitize boolean type with false value", async () => {
    const sanitized = await sanitizeInputs.call({
      ...context,
      schema: {
        fields: {
          prop1: {
            type: Boolean
          },
          prop2: {
            type: Boolean
          },
          prop3: {
            type: Boolean
          },
          prop4: {
            type: Boolean
          },
          prop5: {
            type: Boolean
          },
          prop6: {
            type: Boolean
          }
        }
      },
      inputs: {
        prop1: "false",
        prop2: 0,
        prop3: "0",
        prop4: "",
        prop5: null,
        prop6: false
      }
    })

    expect(sanitized)
      .to.haveOwnProperty("prop1")
      .to.be.equal(false)
    expect(sanitized)
      .to.haveOwnProperty("prop2")
      .to.be.equal(false)
    expect(sanitized)
      .to.haveOwnProperty("prop3")
      .to.be.equal(false)
    expect(sanitized)
      .to.haveOwnProperty("prop4")
      .to.be.equal(false)
    expect(sanitized)
      .to.haveOwnProperty("prop5")
      .to.be.equal(false)
    expect(sanitized)
      .to.haveOwnProperty("prop6")
      .to.be.equal(false)
  })

  it("will apply sanitizers with map type", async () => {
    const sanitized = await sanitizeInputs.call({
      ...context,
      schema: {
        fields: {
          prop1: {
            type: Map,
            of: {
              type: String,
              lowercase: true,
              trim: true
            }
          }
        }
      },
      inputs: {
        prop1: {
          nested1: "ONE",
          nested2: "   TWO   "
        }
      }
    })

    expect(sanitized).to.haveOwnProperty("prop1")
    expect(sanitized.prop1.nested1).that.be.equal("one")
    expect(sanitized.prop1.nested2).that.be.equal("two")
  })
})
