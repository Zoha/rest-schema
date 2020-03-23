const { expect } = require("chai")
const sanitizeInput = require("../../src/restSchema/contextMethods/sanitizeInput")

const context = {
  route: "create"
}

describe("sanitizeInput method", () => {
  it("will trim without any sanitizer", async () => {
    const sanitizers = {}
    const value = "hello"
    const result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.be.equal(value)
  })

  it("will trim input", async () => {
    let sanitizers = {
      trim: true
    }
    const value = "  hello   "
    let result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.be.equal("hello")

    sanitizers = {
      trim: {
        create: true
      }
    }
    result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.be.equal("hello")

    sanitizers = {
      trim: {
        update: true
      }
    }
    result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.not.be.equal("hello")
  })

  it("will uppercase input", async () => {
    let sanitizers = {
      uppercase: true
    }
    const value = "hello"
    let result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.be.equal("HELLO")

    sanitizers = {
      uppercase: {
        create: true
      }
    }
    result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.be.equal("HELLO")

    sanitizers = {
      uppercase: {
        update: true
      }
    }
    result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.not.be.equal("HELLO")
  })

  it("will lowercase input", async () => {
    let sanitizers = {
      lowercase: true
    }
    const value = "Hello"
    let result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.be.equal("hello")

    sanitizers = {
      lowercase: {
        create: true
      }
    }
    result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.be.equal("hello")

    sanitizers = {
      lowercase: {
        update: true
      }
    }
    result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.not.be.equal("hello")
  })

  it("will apply custom sanitizer", async () => {
    let sanitizers = {
      sanitize: (val, ctx) => {
        return `${val}-${ctx.route}`
      }
    }
    const value = "hello"
    let result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.be.equal("hello-create")

    sanitizers = {
      sanitize: {
        create: (val, ctx) => {
          return `${val}-${ctx.route}`
        }
      }
    }
    result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.be.equal("hello-create")

    sanitizers = {
      sanitize: {
        update: (val, ctx) => {
          return `${val}-${ctx.route}`
        }
      }
    }
    result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.not.be.equal("hello")
  })

  it("will do all together", async () => {
    const sanitizers = {
      trim: true,
      lowercase: true,
      sanitize: (val, ctx) => {
        return `${val}-${ctx.route}`
      }
    }
    const value = "    HELLO   "
    const result = await sanitizeInput.call(context, value, sanitizers)
    expect(result).to.be.equal("hello-create")
  })
})
