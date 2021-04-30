/* eslint-disable no-underscore-dangle */
const { expect } = require("chai")
const express = require("express")
const request = require("supertest")
const bodyParser = require("body-parser")
const model = require("../../src/testHelpers/model")
const expressErrorHandler = require("../../src/testHelpers/expressErrorHandler")
const { ValidationError } = require("../../src/restSchema/errors")
const { schema: createSchema } = require("../../src/restSchema/index")
const defaultSchemaRoutes = require("../../src/restSchema/defaults/schema/defaultSchemaRoutes")

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

const ModelSchema = createSchema(model, schema.fields, { ...schema })

describe("schema wrappers", () => {
  beforeEach(async () => {
    await model.deleteMany()
    app.use(bodyParser.json())
    app.use(expressErrorHandler)
  })

  it("response to wrapper shape", async () => {
    app.use("/tests", ModelSchema.resource(schema))

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
    app.use("/tests", ModelSchema.resource(schema))

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

  it("response to route wrapper shape", async () => {
    const ModelSchema2 = createSchema(model, schema.fields, {
      ...schema,
      routes: [
        {
          path: "/test",
          name: "test",
          handler: defaultSchemaRoutes.index.handler,
          wrappers: {
            response(data) {
              return {
                status: true,
                body: data
              }
            }
          }
        }
      ]
    })

    app.use("/tests", ModelSchema2.resource())

    await model.create({
      prop1: "something"
    })
    await request(app)
      .get("/tests/test")
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("object")
          .that.have.ownProperty("status")
          .that.equals(true)
        expect(response.body)
          .to.be.an("array")
          .that.have.lengthOf(1)
      })
  })

  it("error to route wrapper shape", async () => {
    const ModelSchema2 = createSchema(model, schema.fields, {
      ...schema,
      routes: [
        {
          path: "/test",
          method: "post",
          name: "test",
          handler: () => {
            throw new Error("")
          },
          wrappers: {
            error(err) {
              return {
                status: false,
                body: err.message
              }
            }
          }
        }
      ]
    })

    app.use("/tests", ModelSchema2.resource())
    await request(app)
      .post("/tests/test")
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
        expect(response.body).to.be.an("string")
      })
  })
})
