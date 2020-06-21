const { expect } = require("chai")
const routeFormatter = require("../../src/restSchema/schemaFormatters/routeFormatter")
const defaults = require("../../src/restSchema/defaults")

describe("test routeFormatter module", function() {
  it("throw error on invalid argument", async () => {
    expect(() => {
      routeFormatter.getRoute(true, defaults)
    }).to.throw()

    expect(() => {
      routeFormatter.getRoute("ok", defaults)
    }).to.throw()

    expect(() => {
      routeFormatter.getRoute("create", defaults)
    }).to.not.throw()

    expect(() => {
      routeFormatter.getRoute({}, defaults)
    }).to.not.throw()
  })

  it("merge default values for custom route object", async () => {
    const createRoute = routeFormatter.getRoute(
      {
        name: "create",
        custom: "custom"
      },
      defaults
    )

    expect(createRoute.method).to.equal("post")
    expect(createRoute.path).to.equal("/")
    expect(createRoute.name).to.equal("create")
    expect(createRoute.custom).to.equal("custom")
  })

  it("returns default options for predefined routes", async () => {
    const createRoute = routeFormatter.getRoute("create", defaults)

    expect(createRoute.method).to.equal("post")
    expect(createRoute.path).to.equal("/")
    expect(createRoute.name).to.equal("create")
  })

  it("returns all routes objects for getting group of routes", async () => {
    const createRoute = routeFormatter.getRoutes(["create", "update"], defaults)

    expect(createRoute).to.have.lengthOf(2)
    expect(createRoute[0]).to.be.an("object")
  })
})
