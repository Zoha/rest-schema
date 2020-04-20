const { expect } = require("chai")
const sanitizeInput = require("../../src/restSchema/contextMethods/sanitizeInput")

const context = {
  route: "create"
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
})
