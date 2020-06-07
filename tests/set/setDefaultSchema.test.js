const {
  setDefaultSchema,
  setDefaultSchemaFields,
  setDefaultSchemaRoutes,
  setDefaultSchemaPagination,
  setDefaultSchemaWrappers
} = require("../../src/restSchema/set")
const { expect } = require("chai")
const { defaultSchema } = require("../../src/restSchema/defaults")
const deepClone = require("clone-deep")

describe("set default schema", () => {
  it("change default schema fields", () => {
    const target = deepClone(defaultSchema)
    expect(target.fields._id).to.be.an("object")
    expect(target.fields.createdAt).to.be.an("object")

    setDefaultSchema(
      {
        fields: {
          _id: false
        }
      },
      {
        target
      }
    )

    expect(target.fields._id).to.be.an("boolean")
    expect(target.fields.createdAt).to.be.an("object")
  })

  it("change default schema fields with disabled merge", () => {
    const target = deepClone(defaultSchema)
    expect(target.fields._id).to.be.an("object")
    expect(target.fields.createdAt).to.be.an("object")

    setDefaultSchema(
      {
        fields: {
          _id: false
        }
      },
      {
        target,
        mergeFields: false
      }
    )

    expect(target.fields._id).to.be.an("boolean")
    expect(target.fields.createdAt).to.be.equal(undefined)
  })

  it("change default schema fields with its own method", () => {
    const target = deepClone(defaultSchema.fields)
    expect(target._id).to.be.an("object")
    expect(target.createdAt).to.be.an("object")

    setDefaultSchemaFields(
      {
        _id: false
      },
      {
        target
      }
    )

    expect(target._id).to.be.an("boolean")
    expect(target.createdAt).to.be.an("object")
  })

  it("change default schema routes", () => {
    const target = deepClone(defaultSchema)
    expect(target.routes.index).to.be.an("object")
    expect(target.routes.create).to.be.an("object")

    setDefaultSchema(
      {
        routes: {
          index: undefined
        }
      },
      {
        target
      }
    )

    expect(target.routes.index).to.be.equal(undefined)
    expect(target.routes.create).to.be.an("object")
  })

  it("change default schema routes with disabled merge", () => {
    const target = deepClone(defaultSchema)
    expect(target.routes.index).to.be.an("object")
    expect(target.routes.create).to.be.an("object")

    setDefaultSchema(
      {
        routes: {
          index: undefined
        }
      },
      {
        target,
        mergeRoutes: false
      }
    )

    expect(target.routes.index).to.be.equal(undefined)
    expect(target.routes.create).to.be.equal(undefined)
  })

  it("change default schema routes with its own method", () => {
    const target = deepClone(defaultSchema.routes)
    expect(target.index).to.be.an("object")
    expect(target.create).to.be.an("object")

    setDefaultSchemaRoutes(
      {
        index: undefined
      },
      {
        target
      }
    )

    expect(target.index).to.be.equal(undefined)
    expect(target.create).to.be.an("object")
  })

  it("change default schema pagination", () => {
    const target = deepClone(defaultSchema)
    expect(target.pagination.page).to.be.equal(1)
    expect(target.pagination.limit).to.be.equal(10)

    setDefaultSchema(
      {
        pagination: {
          page: 2
        }
      },
      {
        target
      }
    )

    expect(target.pagination.page).to.be.equal(2)
    expect(target.pagination.limit).to.be.equal(10)
  })

  it("change default schema pagination with its own method", () => {
    const target = deepClone(defaultSchema.pagination)
    expect(target.page).to.be.equal(1)
    expect(target.limit).to.be.equal(10)

    setDefaultSchemaPagination(
      {
        page: 2
      },
      {
        target
      }
    )

    expect(target.page).to.be.equal(2)
    expect(target.limit).to.be.equal(10)
  })

  it("change default schema wrappers", () => {
    const target = deepClone(defaultSchema)
    expect(target.wrappers.response).to.be.a("function")
    expect(target.wrappers.error).to.be.a("function")

    setDefaultSchema(
      {
        wrappers: {
          response: null
        }
      },
      {
        target
      }
    )

    expect(target.wrappers.response).to.be.equal(null)
    expect(target.wrappers.error).to.be.a("function")
  })

  it("change default schema wrappers with its own method", () => {
    const target = deepClone(defaultSchema.wrappers)
    expect(target.response).to.be.a("function")
    expect(target.error).to.be.a("function")

    setDefaultSchemaWrappers(
      {
        response: null
      },
      {
        target
      }
    )

    expect(target.response).to.be.equal(null)
    expect(target.error).to.be.a("function")
  })

  it("set other data of schema", () => {
    const target = deepClone(defaultSchema)
    expect(target.filters).to.be.an("object")
    expect(target.middleware).to.be.an("object")

    setDefaultSchema(
      {
        filters: "something else"
      },
      {
        target
      }
    )

    expect(target.filters).to.be.an("string")
    expect(target.middleware).to.be.an("object")
  })
})
