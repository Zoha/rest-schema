const { expect } = require("chai")
const defaultRouteObject = require("../../src/restSchema/defaults/defaultRoute")
const getNestedField = require("../../src/restSchema/contextMethods/getNestedField")
const getPaginationData = require("../../src/restSchema/contextMethods/getPaginationData")
const cast = require("../../src/restSchema/helpers/cast")
const getCustomFilters = require("../../src/restSchema/contextMethods/getCustomFilters")
const getRoutes = require("../../src/restSchema/contextMethods/getRoutes")
const createContext = require("../../src/restSchema/createContext")

const context = {
  ...createContext(
    {},
    {
      ...defaultRouteObject
    }
  ),
  inputs: {},
  getRoutes,
  getCustomFilters,
  schema: {
    routes: [],
    filters: {},
    pagination: {
      defaultFilters: {}
    }
  },
  getNestedField,
  cast
}

describe("getPaginationData method", () => {
  it("will get pagination normally", async () => {
    const result = await getPaginationData.call(context)
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("defaultFilters")
  })

  it("will get pagination object from function", async () => {
    const result = await getPaginationData.call({
      ...context,
      schema: {
        routes: [],
        filters: {},
        pagination: () => ({
          defaultFilters: {}
        })
      }
    })
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("defaultFilters")
  })

  it("will get pagination object from function child", async () => {
    const result = await getPaginationData.call({
      ...context,
      schema: {
        routes: [],
        filters: {},
        pagination: () => ({
          defaultFilters: () => ({
            something: true
          })
        })
      }
    })
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("defaultFilters")
      .that.haveOwnProperty("something")
      .that.equals(true)
  })

  it("will be merged with route pagination", async () => {
    const result = await getPaginationData.call({
      ...context,
      routeObject: {
        pagination: {
          defaultFilters() {
            return {
              somethingElse: false
            }
          }
        }
      },
      schema: {
        routes: [],
        filters: {},
        pagination: () => ({
          defaultFilters: () => ({
            something: true
          })
        })
      }
    })
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("defaultFilters")
      .that.haveOwnProperty("something")
      .that.equals(true)
    expect(result)
      .that.haveOwnProperty("defaultFilters")
      .that.haveOwnProperty("somethingElse")
      .that.equals(false)
  })
})
