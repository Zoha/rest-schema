const { expect } = require("chai")
const defaultRouteObject = require("../../src/restSchema/defaults/defaultRoute")
const createContext = require("../../src/restSchema/createContext")
const defaultSchema = require("../../src/restSchema/defaults/defaultSchema")
const { ObjectId } = require("../../src/restSchema/types")

describe("setMeta method", () => {
  it("set filters", async () => {
    const _id = ObjectId()
    const context = {
      ...createContext(
        { ...defaultSchema, filters: { something: true, filter3: 3 } },
        {
          ...defaultRouteObject
        }
      ),
      inputs: {
        something: false,
        filter1: 1,
        _id: _id.toString(),
        filter3: 10
      }
    }
    context.setMeta({
      filters: {
        filter1: 50,
        filter3: 100
      }
    })

    const filters = await context.getFilters()

    expect(filters.something).to.be.equal(true)
    expect(filters.filter3).to.be.equal(3)
    expect(filters.filter1).to.be.equal(50)
    expect(filters._id.toString()).to.be.equal(_id.toString())
  })
  it("set select", async () => {
    const context = {
      ...createContext(
        { ...defaultSchema },
        {
          ...defaultRouteObject
        }
      ),
      inputs: {
        select: "createdAt updatedAt"
      }
    }
    const customSelect = "updatedAt"
    context.setMeta({
      select: customSelect
    })

    const select = context.inputs.select

    expect(select).to.be.equal(customSelect)
  })
  it("set sort", async () => {
    const context = {
      ...createContext(
        { ...defaultSchema },
        {
          ...defaultRouteObject
        }
      ),
      inputs: {
        sort: "something-here"
      }
    }
    const customSort = "updatedAt"
    context.setMeta({
      sort: customSort
    })

    const sort = await context.getSort()

    expect(sort)
      .to.be.an("object")
      .that.haveOwnProperty("updatedAt")
  })
  it("set page", async () => {
    const context = {
      ...createContext(
        { ...defaultSchema },
        {
          ...defaultRouteObject
        }
      ),
      inputs: {
        page: 10
      }
    }
    context.setMeta({
      page: 100
    })

    const page = await context.getPage()

    expect(page).to.be.equal(100)
  })
  it("set limit", async () => {
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
    context.setMeta({
      limit: 40
    })

    const limit = await context.getLimit()

    expect(limit).to.be.equal(40)
  })
  it("set skip", async () => {
    const context = {
      ...createContext(
        { ...defaultSchema },
        {
          ...defaultRouteObject
        }
      ),
      inputs: {
        skip: 10
      }
    }
    context.setMeta({
      skip: 100
    })

    const skip = await context.getSkip()

    expect(skip).to.be.equal(100)
  })
})
