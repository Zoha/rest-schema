const { expect } = require("chai")
const sanitizeInput = require("../../src/restSchema/contextMethods/sanitizeInput")
const getNestedInput = require("../../src/restSchema/contextMethods/getNestedInput")
const cast = require("../../src/restSchema/contextMethods/cast")

const context = {
  route: "create",
  getNestedInput,
  cast
}

describe("sanitizeInput method", () => {
  it("will trim without any sanitizer", async () => {
    const field = {}
    const value = "hello"
    const result = await sanitizeInput.call(context, { value, field })
    expect(result).to.be.equal(value)
  })

  it("will trim input", async () => {
    let field = {
      trim: true
    }
    const value = "  hello   "
    let result = await sanitizeInput.call(context, { value, field })
    expect(result).to.be.equal("hello")

    field = {
      trim: {
        create: true
      }
    }
    result = await sanitizeInput.call(context, { value, field })
    expect(result).to.be.equal("hello")

    field = {
      trim: {
        update: true
      }
    }
    result = await sanitizeInput.call(context, { value, field })
    expect(result).to.not.be.equal("hello")
  })

  it("will uppercase input", async () => {
    let field = {
      uppercase: true
    }
    const value = "hello"
    let result = await sanitizeInput.call(context, { value, field })
    expect(result).to.be.equal("HELLO")

    field = {
      uppercase: {
        create: true
      }
    }
    result = await sanitizeInput.call(context, { value, field })
    expect(result).to.be.equal("HELLO")

    field = {
      uppercase: {
        update: true
      }
    }
    result = await sanitizeInput.call(context, { value, field })
    expect(result).to.not.be.equal("HELLO")
  })

  it("will lowercase input", async () => {
    let field = {
      lowercase: true
    }
    const value = "Hello"
    let result = await sanitizeInput.call(context, { value, field })
    expect(result).to.be.equal("hello")

    field = {
      lowercase: {
        create: true
      }
    }
    result = await sanitizeInput.call(context, { value, field })
    expect(result).to.be.equal("hello")

    field = {
      lowercase: {
        update: true
      }
    }
    result = await sanitizeInput.call(context, { value, field })
    expect(result).to.not.be.equal("hello")
  })

  it("will apply custom sanitizer", async () => {
    let field = {
      sanitize: (val, ctx) => {
        return `${val}-${ctx.route}`
      }
    }
    const value = "hello"
    let result = await sanitizeInput.call(context, { value, field })
    expect(result).to.be.equal("hello-create")

    field = {
      sanitize: {
        create: (val, ctx) => {
          return `${val}-${ctx.route}`
        }
      }
    }
    result = await sanitizeInput.call(context, { value, field })
    expect(result).to.be.equal("hello-create")

    field = {
      sanitize: {
        update: (val, ctx) => {
          return `${val}-${ctx.route}`
        }
      }
    }
    result = await sanitizeInput.call(context, { value, field })
    expect(result).to.not.be.equal("hello")
  })

  it("will do all together", async () => {
    const field = {
      trim: true,
      lowercase: true,
      sanitize: (val, ctx) => {
        return `${val}-${ctx.route}`
      }
    }
    const value = "    HELLO   "
    const result = await sanitizeInput.call(context, { value, field })
    expect(result).to.be.equal("hello-create")
  })

  it("will pick unique values in array", async () => {
    let field = {
      type: Object,
      pickUniqueItems: item => item.key1 + item.key2
    }

    let value = [
      {
        key1: "value",
        key2: "value"
      },
      {
        key1: "value",
        key2: "value 2"
      },
      {
        key1: "value",
        key2: "value"
      }
    ]

    let result = await sanitizeInput.call(context, { value, field })
    expect(result.length).to.be.equal(2)

    field = {
      type: Object,
      pickUniqueItems: true
    }

    value = [1, 2, 3, 2]

    result = await sanitizeInput.call(context, { value, field })
    expect(result.length).to.be.equal(3)
  })
})
