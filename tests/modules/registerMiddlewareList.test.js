const { expect } = require("chai")
const routeObject = require("../../src/restSchema/defaults/defaultRoute")
const registerMiddlewareList = require("../../src/restSchema/middleware/registerMiddlewareList")
const defaults = require("../../src/restSchema/defaults")

describe("registerMiddlewareList middleware", () => {
  it("will return middleware if was a function", async () => {
    const func = () => {}
    const result = await registerMiddlewareList(
      {
        middleware: func,
        defaults
      },
      routeObject
    )

    expect(result[0]).to.be.equal(func)
  })

  it("return array of middleware if middleware was an array", async () => {
    const list = [() => {}, () => {}]
    const result = await registerMiddlewareList(
      {
        middleware: list,
        defaults
      },
      routeObject
    )

    expect(result[0]).to.be.equal(list[0])
    expect(result[1]).to.be.equal(list[1])
  })

  it("return global middleware list with global middleware", async () => {
    const list = {
      global: [() => {}, () => {}],
      update: [() => {}, () => {}],
      create: [() => {}, () => {}]
    }
    const result = await registerMiddlewareList(
      {
        middleware: list,
        defaults
      },
      {
        ...routeObject,
        name: "create"
      }
    )

    expect(result).to.includes(list.global[0])
    expect(result).to.includes(list.global[1])
    expect(result).to.includes(list.create[0])
    expect(result).to.includes(list.create[0])
    expect(result).to.not.include(list.update[0])
    expect(result).to.not.include(list.update[0])
  })

  it("will return plugin middleware list first", async () => {
    const list = [() => {}, () => {}]
    const pluginMiddleware = () => {}
    const result = await registerMiddlewareList(
      {
        middleware: list,
        defaults: {
          defaultPluginMiddlewareList: {
            global: [pluginMiddleware],
            default: [pluginMiddleware]
          }
        }
      },
      routeObject
    )

    expect(result[0]).to.be.equal(pluginMiddleware)
    expect(result[1]).to.be.equal(pluginMiddleware)
    expect(result[2]).to.be.equal(list[0])
    expect(result[3]).to.be.equal(list[1])
  })
})
