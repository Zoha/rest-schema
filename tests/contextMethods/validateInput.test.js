const { expect } = require("chai")
const validateInput = require("../../src/restSchema/contextMethods/validateInput")
const model = require("../../src/testHelpers/model")

const context = {
  route: "create",
  model
}

describe("validateInput method", () => {
  it("required validate", async () => {
    let error

    const validations = {
      required: true
    }
    let value

    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field is required")

    value = "something"
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("min validate on string", async () => {
    let error

    const validations = {
      min: 10
    }
    let value = "less"

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should be more than 10")

    value = "something that is not less"
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("max validate on string", async () => {
    let error

    const validations = {
      max: 10
    }
    let value = "something that is not less"

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should be less than 10")

    value = "less"
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("min validate on number", async () => {
    let error

    const validations = {
      min: 10.2
    }
    let value = 10

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should be more than 10.2")

    value = 10.3
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("max validate on number", async () => {
    let error

    const validations = {
      max: 10
    }
    let value = 12

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should be less than 10")

    value = 8
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("minLength validate", async () => {
    let error

    const validations = {
      minLength: 10
    }
    let value = "less"

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should have more than 10 characters")

    value = "something that is not less"
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("maxLength validate", async () => {
    let error

    const validations = {
      maxLength: 10
    }
    let value = "something that is not less"

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should have less than 10 characters")

    value = "less"
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("between validate on string", async () => {
    let error

    const validations = {
      between: [5, 6]
    }
    let value = "1234567"

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 value should be between 5 and 6")

    value = "1234"
    error = null
    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 value should be between 5 and 6")

    value = "123456"
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("between validate on number", async () => {
    let error

    const validations = {
      between: [10.2, 11]
    }
    let value = 10.1

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 value should be between 10.2 and 11")

    value = 11.1
    error = null

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 value should be between 10.2 and 11")

    value = 10.3
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("betweenLength validate", async () => {
    let error

    const validations = {
      betweenLength: [5, 6]
    }
    let value = "1234567"

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 characters length should be between 5 and 6")

    value = "1234"
    error = null
    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 characters length should be between 5 and 6")

    value = "123456"
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("betweenLength validate", async () => {
    let error

    const validations = {
      betweenLength: [5, 6]
    }
    let value = "1234567"

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 characters length should be between 5 and 6")

    value = "1234"
    error = null
    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 characters length should be between 5 and 6")

    value = "123456"
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("min validate on array", async () => {
    let error

    const validations = {
      min: 10
    }
    let value = [1, 2, 3, 4]

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should be more than 10")

    value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("max validate on array", async () => {
    let error

    const validations = {
      max: 10
    }
    let value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 should be less than 10")

    value = [1, 2, 3]
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("between validate on array", async () => {
    let error

    const validations = {
      between: [5, 6]
    }
    let value = [1, 2, 3, 4, 5, 6, 7]

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 value should be between 5 and 6")

    value = [1, 2, 3, 4]
    error = null
    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 value should be between 5 and 6")

    value = [1, 2, 3, 4, 5, 6]
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("match validate", async () => {
    let error

    const validations = {
      match: {
        create: new RegExp("ok$")
      }
    }
    let value = "ends with invalid"

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 is invalid")

    value = "ends with ok"
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("enum validate", async () => {
    let error

    const validations = {
      enum: ["valid1", "valid2"]
    }
    let value = "invalid"

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 is invalid")

    value = "valid2"
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })

  it("custom validate", async () => {
    let error

    const validations = {
      validate: value => {
        return value.length > 5
      }
    }
    const value = "less"

    try {
      await validateInput.call(context, value, validations, "field1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("field1 is invalid")
  })

  it("custom validate in validate object", async () => {
    let error

    const validations = {
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
      await validateInput.call(context, value, validations, "field1")
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

    const validations = {
      unique: true
    }
    let value = "prop1"

    try {
      await validateInput.call(context, value, validations, "prop1")
    } catch (e) {
      error = e
    }

    expect(error)
      .to.haveOwnProperty("message")
      .that.equals("prop1 should be unique, prop1 already exists")

    value = "prop2"
    error = null
    try {
      await validateInput.call(context, value, validations)
    } catch (e) {
      error = e
    }
    expect(error).to.be.equal(null)
  })
})
