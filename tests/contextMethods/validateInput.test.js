const { expect } = require("chai")
const validateInput = require("../../src/restSchema/contextMethods/validateInput")
const model = require("../../src/testHelpers/model")
const cloneDeep = require("clone-deep")
const schemaMaker = require("../../src/restSchema/schema")
const createContext = require("../../src/restSchema/createContext")
const { defaultSchema } = require("../../src/restSchema/defaults")
const moment = require("moment")
const defaultRoute = require("../../src/restSchema/defaults/defaultRoute")

const context = createContext(
  { ...defaultSchema, model },
  { ...defaultRoute, ...defaultSchema.routes.create }
)

describe("validateInput method", () => {
  beforeEach(async () => {
    await model.deleteMany()
  })

  it("required validate", async () => {
    let error

    const field = {
      required: true
    }
    let value

    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field is required")

    value = "something"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("min validate on string", async () => {
    let error

    const field = {
      min: 10
    }
    let value = "less"

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should be more than 10")

    value = "something that is not less"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("max validate on string", async () => {
    let error

    const field = {
      max: 10
    }
    let value = "something that is not less"

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should be less than 10")

    value = "less"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("min validate on number", async () => {
    let error

    const field = {
      min: 10.2
    }
    let value = 10

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should be more than 10.2")

    value = 10.3
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("max validate on number", async () => {
    let error

    const field = {
      max: 10
    }
    let value = 12

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should be less than 10")

    value = 8
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("minLength validate", async () => {
    let error

    const field = {
      minLength: 10
    }
    let value = "less"

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should have more than 10 characters")

    value = "something that is not less"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("maxLength validate", async () => {
    let error

    const field = {
      maxLength: 10
    }
    let value = "something that is not less"

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should have less than 10 characters")

    value = "less"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("between validate on string", async () => {
    let error

    const field = {
      between: [5, 6]
    }
    let value = "1234567"

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 value should be between 5 and 6")

    value = "1234"
    error = null
    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 value should be between 5 and 6")

    value = "123456"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("between validate on number", async () => {
    let error

    const field = {
      between: [10.2, 11]
    }
    let value = 10.1

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 value should be between 10.2 and 11")

    value = 11.1
    error = null

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 value should be between 10.2 and 11")

    value = 10.3
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("betweenLength validate", async () => {
    let error

    const field = {
      betweenLength: [5, 6]
    }
    let value = "1234567"

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 characters length should be between 5 and 6")

    value = "1234"
    error = null
    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 characters length should be between 5 and 6")

    value = "123456"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("betweenLength validate", async () => {
    let error

    const field = {
      betweenLength: [5, 6]
    }
    let value = "1234567"

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 characters length should be between 5 and 6")

    value = "1234"
    error = null
    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 characters length should be between 5 and 6")

    value = "123456"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("min validate on array", async () => {
    let error

    const field = {
      min: 10
    }
    let value = [1, 2, 3, 4]

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should be more than 10")

    value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("max validate on array", async () => {
    let error

    const field = {
      max: 10
    }
    let value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should be less than 10")

    value = [1, 2, 3]
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("between validate on array", async () => {
    let error

    const field = {
      between: [5, 6]
    }
    let value = [1, 2, 3, 4, 5, 6, 7]

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 value should be between 5 and 6")

    value = [1, 2, 3, 4]
    error = null
    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 value should be between 5 and 6")

    value = [1, 2, 3, 4, 5, 6]
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("match validate", async () => {
    let error

    const field = {
      match: {
        create: new RegExp("ok$")
      }
    }
    let value = "ends with invalid"

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 is invalid")

    value = "ends with ok"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("enum validate", async () => {
    let error

    const field = {
      enum: ["valid1", "valid2"]
    }
    let value = "invalid"

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 is invalid")

    value = "valid2"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("custom validate", async () => {
    let error

    const field = {
      validate: value => {
        return value.length > 5
      }
    }
    const value = "less"

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 is invalid")
  })

  it("custom validate in validate object", async () => {
    let error

    const field = {
      validate: {
        validator: value => {
          return value.length > 5
        },
        message: "field is invalid"
      }
    }
    const value = "less"
    error = null
    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }
    expect(error)
      .to.haveOwnProperty("message")
      .that.equal("field is invalid")
  })

  it("unique validate", async () => {
    await model.create({
      prop1: "prop1"
    })
    let error

    const field = {
      unique: true,
      nestedKey: "prop1"
    }
    let value = "prop1"

    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("prop1 should be unique, prop1 already exists")

    value = "prop2"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("auth validate", async () => {
    await model.create({
      prop1: "prop1"
    })
    let error

    const field = {
      auth: async value => {
        if (value == "error") {
          throw new Error("error")
        } else if (value == "false") {
          return false
        }
        return true
      }
    }
    let value = "error"

    try {
      await validateInput.call(context, { value, field, key: "prop1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("error")

    value = "false"
    error = null
    try {
      await validateInput.call(context, { value, field, key: "prop1" })
    } catch (e) {
      error = e
    }
    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("authorization failed for prop1")

    value = "else"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("uniqueItems validate", async () => {
    let error

    let field = {
      nestedKey: "prop1",
      type: Array,
      uniqueItems: true
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

    let localContext = cloneDeep(context)

    error = null
    try {
      await validateInput.call(localContext, { value, field })
    } catch (e) {
      error = e
    }

    if (error !== null) {
      throw new Error("expect error to be null")
    }

    field = {
      nestedKey: "prop1",
      type: Array,
      uniqueItems: i => i.key1 + i.key2
    }

    error = null
    try {
      await validateInput.call(localContext, { value, field })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equal("prop1 should have unique items")

    field = {
      nestedKey: "prop1",
      type: Array,
      uniqueItems: true
    }

    value = [1, 2, 3, 2]

    error = null
    try {
      await validateInput.call(localContext, { value, field })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equal("prop1 should have unique items")
  })

  it("existsIn validate", async () => {
    // create model 2 schema builder
    const schema2 = schemaMaker(
      model,
      {
        prop1: String
      },
      { name: "SchemaSample", routeKeys: ["prop1"] }
    )

    const value = "test"

    // try and check validate for existsIn validate
    let error = null
    try {
      await validateInput.call(context, {
        value,
        field: {
          type: String,
          existsIn: "SchemaSample"
        }
      })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("this field does not exists")

    await model.create({
      prop1: "something not create"
    })

    // try and check validate for existsIn validate
    error = null
    try {
      await validateInput.call(context, {
        value,
        field: {
          type: String,
          existsIn: "SchemaSample"
        }
      })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("this field does not exists")

    // check again
    await model.create({
      prop1: "test"
    })
    error = null
    try {
      await validateInput.call(context, {
        value,
        field: {
          type: String,
          existsIn: "SchemaSample"
        }
      })
    } catch (e) {
      error = e
    }

    if (error !== null) {
      throw new Error("expect error to be null")
    }
  })

  it("ignore unique validate when is the same resource", async () => {
    const created = await model.create({
      prop1: "prop1"
    })
    let error = null

    const field = {
      unique: true,
      nestedKey: "prop1"
    }
    let value = "prop1"

    try {
      await validateInput.call(
        {
          ...context,
          route: "update",
          req: {
            params: {
              id: created._id.toString()
            }
          }
        },
        { value, field }
      )
    } catch (e) {
      error = e
    }

    expect(error).to.be.equal(null)
  })

  it("requiredUpdate validate", async () => {
    const created = await model.create({
      prop1: "prop1"
    })
    let error = null

    const field = {
      requiredUpdate: true,
      nestedKey: "prop1"
    }
    let value = null

    try {
      await validateInput.call(
        {
          ...context,
          route: "update",
          req: {
            params: {
              id: created._id.toString()
            }
          }
        },
        { value, field }
      )
    } catch (e) {
      error = e
    }

    expect(error).to.not.be.equal(null)
  })

  it("enum validate with object value", async () => {
    let error

    const field = {
      enum: { first: "valid1", second: "valid2" }
    }
    let value = "invalid"

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 is invalid")

    value = "valid2"
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("min validate on date", async () => {
    let error

    const field = {
      min: new Date(moment().subtract(1, "seconds"))
    }
    let value = new Date(moment().subtract(5, "seconds"))

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals(`field1 should be more than ${field.min.toLocaleString()}`)

    value = new Date(moment().add(2, "seconds"))
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("max validate on date", async () => {
    let error

    const field = {
      max: new Date(moment().add(1, "seconds"))
    }
    let value = new Date(moment().add(5, "seconds"))

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals(`field1 should be less than ${field.max.toLocaleString()}`)

    value = new Date(moment().subtract(2, "seconds"))
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("between validate on date", async () => {
    let error

    const field = {
      between: [new Date(moment().subtract(1, "second")), new Date(moment().add(1, "hour"))]
    }
    let value = new Date(moment().subtract(5, "seconds"))

    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals(
        `field1 value should be between ${field.between[0].toLocaleString()} and ${field.between[1].toLocaleString()}`
      )

    value = new Date(moment().add(2, "hours"))
    error = null
    try {
      await validateInput.call(context, { value, field, key: "field1" })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals(
        `field1 value should be between ${field.between[0].toLocaleString()} and ${field.between[1].toLocaleString()}`
      )

    value = new Date(moment().add(20, "minutes"))
    error = null
    try {
      await validateInput.call(context, { value, field })
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("existsIn validate for mongoose model", async () => {
    // create model 2 schema builder
    const schema2 = schemaMaker(
      model,
      {
        prop1: String
      },
      { name: model.collection.collectionName, routeKeys: ["prop1"] }
    )

    const value = "test"

    // try and check validate for existsIn validate
    let error = null
    try {
      await validateInput.call(context, {
        value,
        field: {
          type: String,
          existsIn: model
        }
      })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("this field does not exists")

    await model.create({
      prop1: "something not create"
    })

    // try and check validate for existsIn validate
    error = null
    try {
      await validateInput.call(context, {
        value,
        field: {
          type: String,
          existsIn: model
        }
      })
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("this field does not exists")

    // check again
    await model.create({
      prop1: "test"
    })
    error = null
    try {
      await validateInput.call(context, {
        value,
        field: {
          type: String,
          existsIn: model
        }
      })
    } catch (e) {
      error = e
    }

    if (error !== null) {
      throw new Error("expect error to be null")
    }
  })
})
