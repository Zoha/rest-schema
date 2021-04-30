const { expect } = require("chai")
const defaultRouteObject = require("../../src/restSchema/defaults/defaultRoute")
const createContext = require("../../src/restSchema/createContext")
const defaultSchema = require("../../src/restSchema/defaults/defaultSchema")
const ValidationError = require("../../src/restSchema/errors/validationError")

describe("getLimit method", () => {
  it("getLimit normally", async () => {
    const context = {
      ...createContext(
        { ...defaultSchema },
        {
          ...defaultRouteObject
        }
      ),
      inputs: {
        limit: 20
      }
    }

    const limit = await context.getLimit()

    expect(limit).to.be.equal(20)
  })

  it("getLimit throws error if limit was more than max or less than min", async () => {
    const context1 = {
      ...createContext(
        {
          ...defaultSchema,
          pagination: {
            maxLimit: 100,
            minLimit: 10
          }
        },
        {
          ...defaultRouteObject
        }
      ),
      inputs: {
        limit: 101
      }
    }

    await context1
      .getLimit()
      .then(() => {
        throw new Error("expected to throw error")
      })
      .catch(e => {
        expect(e).to.be.instanceOf(ValidationError)
      })

    const context2 = {
      ...createContext(
        {
          ...defaultSchema,
          pagination: {
            maxLimit: 100,
            minLimit: 10
          }
        },
        {
          ...defaultRouteObject
        }
      ),
      inputs: {
        limit: 3
      }
    }

    await context2
      .getLimit()
      .then(() => {
        throw new Error("expected to throw error")
      })
      .catch(e => {
        console.log(e.message)
        expect(e).to.be.instanceOf(ValidationError)
      })
  })

  it("getLimit sets max or min if value overflows and throw error option was disabled", async () => {
    const context1 = {
      ...createContext(
        {
          ...defaultSchema,
          pagination: {
            maxLimit: 100,
            minLimit: 10
          },
          errorOnInvalidLimit: false
        },
        {
          ...defaultRouteObject
        }
      ),
      inputs: {
        limit: 101
      }
    }

    await context1.getLimit().then(val => {
      expect(val).to.be.equal(100)
    })

    const context2 = {
      ...createContext(
        {
          ...defaultSchema,
          pagination: {
            maxLimit: 100,
            minLimit: 10
          },
          errorOnInvalidLimit: false
        },
        {
          ...defaultRouteObject
        }
      ),
      inputs: {
        limit: 3
      }
    }

    await context2.getLimit().then(val => {
      expect(val).to.be.equal(10)
    })
  })
})
