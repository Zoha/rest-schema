/* eslint-disable no-underscore-dangle */
const { expect } = require("chai")
const express = require("express")
const request = require("supertest")
const bodyParser = require("body-parser")
const { resource } = require("../../src/restSchema")
const model = require("../../src/testHelpers/model")
const expressErrorHandler = require("../../src/testHelpers/expressErrorHandler")
const { ValidationError } = require("../../src/restSchema/errors")

const app = express()

const schema = {
  model,
  fields: {
    prop1: {
      type: String,
      validate: () => {
        throw new Error("this is not valid")
      }
    }
  },
  wrappers: {
    response(response) {
      return {
        status: true,
        data: response
      }
    },
    error(err) {
      return {
        status: false,
        isInstanceofValidationError: err instanceof ValidationError,
        message: err.message, // will be validation error message
        data: err.validationData
      }
    }
  }
}

describe("schema wrappers", () => {
  beforeEach(async () => {
    await model.deleteMany()
    app.use(bodyParser.json())
    app.use("/tests", resource(schema))
    app.use(expressErrorHandler)
  })

  it("response to wrapper shape", async () => {
    await model.create({
      prop1: "something"
    })
    await request(app)
      .get("/tests")
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("object")
          .that.have.ownProperty("status")
          .that.equals(true)
        expect(response.data)
          .to.be.an("array")
          .that.have.lengthOf(1)
      })
  })

  it("error to wrapper shape", async () => {
    await request(app)
      .post("/tests")
      .send({
        prop1: "invalid"
      })
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("object")
          .that.have.ownProperty("status")
          .that.equals(false)
        expect(response.data)
          .to.be.an("array")
          .that.have.lengthOf(1)
        expect(response.isInstanceofValidationError).to.be.equal(true)
        expect(response.message).to.be.include("validations")
      })
  })
})
