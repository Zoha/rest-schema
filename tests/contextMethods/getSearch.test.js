const { expect } = require("chai")
const createContext = require("../../src/restSchema/createContext")
const defaultRoute = require("../../src/restSchema/defaults/defaultRoute")
const defaultSchema = require("../../src/restSchema/defaults/defaultSchema")

describe("getSearch method", () => {
  it("getSearch method returns search string", async () => {
    const context = createContext(defaultSchema, defaultRoute)

    context.inputs = {
      search: "something"
    }

    const search = await context.getSearch()

    expect(search).to.be.equal(context.inputs.search)
  })
})
