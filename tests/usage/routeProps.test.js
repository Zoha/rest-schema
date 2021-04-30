/* eslint-disable no-underscore-dangle */
const express = require("express")
const request = require("supertest")
const bodyParser = require("body-parser")
const model = require("../../src/testHelpers/model")
const expressErrorHandler = require("../../src/testHelpers/expressErrorHandler")
const { schema: createSchema } = require("../../src/restSchema/index")

const app = express()

const schema = {
  model,
  fields: {
    prop1: String
  }
}

describe("route props", () => {
  beforeEach(async () => {
    await model.deleteMany()
    app.use(bodyParser.json())
    app.use(expressErrorHandler)
  })

  it("works with single middleware", async () => {
    const ModelSchema = createSchema(model, schema.fields, {
      ...schema,
      routes: [
        {
          name: "test",
          path: "/test",
          middleware: (req, res, next) => {
            res.status(440) // a custom error
            return next(new Error())
          },
          handler() {
            return {
              message: true
            }
          }
        }
      ]
    })
    app.use("/test1", ModelSchema.resource(schema))

    request(app)
      .get("/test1")
      .expect(440)
  })

  it("works with multiple middleware", async () => {
    const ModelSchema = createSchema(model, schema.fields, {
      ...schema,
      routes: [
        {
          name: "test",
          path: "/test",
          middleware: [
            (req, res, next) => next(),
            (req, res, next) => {
              res.status(450) // a custom error
              return next(new Error())
            }
          ],
          handler() {
            return {
              message: true
            }
          }
        }
      ]
    })
    app.use("/test2", ModelSchema.resource(schema))

    request(app)
      .get("/test2")
      .expect(450)
  })
})
