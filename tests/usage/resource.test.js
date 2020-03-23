/* eslint-disable no-underscore-dangle */
const { expect } = require("chai")
const express = require("express")
const request = require("supertest")
const bodyParser = require("body-parser")
const { resource } = require("../../src/restSchema")
const model = require("../../src/testHelpers/model")
const expressErrorHandler = require("../../src/testHelpers/expressErrorHandler")
const { Mixed } = require("../../src/restSchema/types")

const app = express()

const schema = {
  model,
  fields: {
    prop1: String,
    prop2: Mixed,
    prop3: {
      type: {
        nested: Number
      }
    },
    prop4: [String, Number],
    prop5: {
      type: String,
      min: 2,
      max: 10,
      validate: val => {
        return /ok$/.test(val)
      }
    }
  },
  routeKeys: ["prop1", "prop3.nested", "_id"]
}

describe("resource method", () => {
  beforeEach(async () => {
    await model.deleteMany()
    app.use(bodyParser.json())
    app.use("/test", resource(schema))
    app.use(expressErrorHandler)
  })

  it("index", async () => {
    // basic test that should return empty array
    await request(app)
      .get("/test")
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("array")
          .that.have.lengthOf(0)
      })

    await model.create({
      prop1: "something",
      prop4: ["1", "2"]
    })

    await request(app)
      .get("/test")
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("array")
          .that.have.lengthOf(1)
        expect(response[0])
          .to.be.an("object")
          .that.haveOwnProperty("prop1")
          .that.equals("something")
        expect(response[0].prop4)
          .to.be.an("array")
          .that.have.lengthOf(2)
        expect(response[0].prop4[0]).to.be.an("string")
        expect(response[0].prop4[1]).to.be.a("number")
      })
  })

  it("filtering index", async () => {
    await model.create({
      prop1: "something"
    })
    await model.create({
      prop1: "something2"
    })

    await request(app)
      .get("/test")
      .query({
        prop1: "something2"
      })
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("array")
          .that.have.lengthOf(1)
        expect(response[0])
          .to.be.an("object")
          .that.haveOwnProperty("prop1")
          .that.equals("something2")
      })

    await request(app)
      .get("/test")
      .query({
        prop1: "something3"
      })
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("array")
          .that.have.lengthOf(0)
      })
  })

  it("index with select fields", async () => {
    await model.create({
      prop1: "something",
      prop2: "something",
      prop3: {
        nested: "something"
      },
      prop4: ["1", "2"]
    })

    await request(app)
      .get("/test")
      .query({
        select: "prop1 prop2"
      })
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("array")
          .that.have.lengthOf(1)
        expect(response[0]).to.be.an("object")
        expect(response[0])
          .to.haveOwnProperty("prop1")
          .that.equals("something")
        expect(response[0])
          .to.haveOwnProperty("prop2")
          .that.equals("something")
        expect(response[0]).to.not.haveOwnProperty("prop3")
        expect(response[0]).to.not.haveOwnProperty("prop4")
      })
  })

  it("index with pagination headers", async () => {
    await model.create({
      prop1: "something"
    })

    await model.create({
      prop1: "something"
    })

    await model.create({
      prop1: "something"
    })

    await model.create({
      prop1: "something"
    })

    await request(app)
      .get("/test")
      .query({
        limit: 2,
        skip: 1
      })
      .expect("Content-Type", /json/)
      .expect(res => {
        const { headers } = res
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("array")
          .that.have.lengthOf(2)

        expect(headers)
          .to.haveOwnProperty("x-total")
          .that.equals("4")

        expect(headers)
          .to.haveOwnProperty("x-count")
          .that.equals("2")

        expect(headers)
          .to.haveOwnProperty("x-range")
          .that.equals("1-3/4")

        expect(headers)
          .to.haveOwnProperty("x-limit")
          .that.equals("2")

        expect(headers)
          .to.haveOwnProperty("x-skip")
          .that.equals("1")

        expect(headers)
          .to.haveOwnProperty("x-page")
          .that.equals("1")

        expect(headers)
          .to.haveOwnProperty("x-prev-page")
          .that.equals("")

        expect(headers)
          .to.haveOwnProperty("x-next-page")
          .that.equals("2")

        expect(headers)
          .to.haveOwnProperty("x-has-prev-page")
          .that.equals("")

        expect(headers)
          .to.haveOwnProperty("x-has-next-page")
          .that.equals("true")

        expect(headers)
          .to.haveOwnProperty("x-last-page")
          .that.equals("2")

        expect(headers)
          .to.haveOwnProperty("x-first-page")
          .that.equals("1")

        expect(headers).to.haveOwnProperty("access-control-expose-headers")
      })
  })

  it("count route", async () => {
    await model.create({
      prop1: "something1"
    })

    await model.create({
      prop1: "something2"
    })

    await model.create({
      prop1: "something3"
    })

    await model.create({
      prop1: "something4"
    })

    await request(app)
      .get("/test/count")
      .query({
        prop1: "$in:something1,something2"
      })
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("object")
          .that.haveOwnProperty("total")
          .that.equals(2)
      })
  })

  it("single route with different keys and select", async () => {
    const dbResource = await model.create({
      prop1: "something",
      prop2: new Date(),
      prop3: {
        nested: 50
      },
      prop4: [1, 2]
    })

    await request(app)
      .get(`/test/${dbResource._id}`)
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.haveOwnProperty("prop1")
          .that.equals(dbResource.prop1)
      })

    await request(app)
      .get(`/test/${dbResource.prop3.nested}`)
      .query({
        select: "-prop1"
      })
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response.prop3.nested).to.be.equals(dbResource.prop3.nested)
        expect(response).to.not.haveOwnProperty("prop1")
      })

    await request(app)
      .get(`/test/${dbResource.prop1}`)
      .query({
        select: "prop1"
      })
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.haveOwnProperty("prop1")
          .that.equals(dbResource.prop1)
        expect(response).to.not.haveOwnProperty("prop2")
        expect(response).to.not.haveOwnProperty("prop3")
        expect(response).to.not.haveOwnProperty("prop4")
      })
  })

  it("create route basic", async () => {
    await request(app)
      .post(`/test`)
      .send({
        prop1: 123,
        prop2: new Date(),
        prop3: {
          nested: 123
        },
        prop4: [123, 123]
      })
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.haveOwnProperty("prop1")
          .that.is.a("string")
          .that.equals("123")
        expect(response)
          .to.haveOwnProperty("prop2")
          .that.is.a("string")
        expect(response)
          .to.haveOwnProperty("prop3")
          .that.is.an("object")
          .that.haveOwnProperty("nested")
          .that.is.a("number")
          .that.equals(123)
        expect(response)
          .to.haveOwnProperty("prop4")
          .that.is.an("array")
          .that.has.length(2)
        expect(response.prop4[0])
          .to.be.a("string")
          .that.equals("123")
        expect(response.prop4[1])
          .to.be.a("number")
          .that.equals(123)
      })
  })

  it("create route validation error", async () => {
    await request(app)
      .post(`/test`)
      .send({
        prop5: "invalid"
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("array")
          .that.have.lengthOf(1)
        expect(response[0])
          .to.haveOwnProperty("value")
          .that.equals("invalid")
        expect(response[0])
          .to.haveOwnProperty("location")
          .that.equals("body")
        expect(response[0])
          .to.haveOwnProperty("field")
          .that.equals("prop5")
        expect(response[0])
          .to.haveOwnProperty("message")
          .that.equals("prop5 is invalid")
      })
  })

  it("update route basic", async () => {
    const dbResource = await model.create({
      prop1: "something"
    })

    await request(app)
      .get(`/test/${dbResource._id}`)
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("object")
          .that.haveOwnProperty("prop1")
          .that.equals("something")
        expect(response).to.not.haveOwnProperty("prop2")
        expect(response).to.not.haveOwnProperty("prop3")
        expect(response).to.not.haveOwnProperty("prop4")
        expect(response).to.not.haveOwnProperty("prop5")
      })

    await request(app)
      .put(`/test/${dbResource._id}`)
      .send({
        prop1: 123,
        prop2: new Date(),
        prop3: {
          nested: 123
        },
        prop4: [123, 123]
      })
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response._id).to.be.equal(dbResource._id.toString())
        expect(response)
          .to.haveOwnProperty("prop1")
          .that.is.a("string")
          .that.equals("123")
        expect(response)
          .to.haveOwnProperty("prop2")
          .that.is.a("string")
        expect(response)
          .to.haveOwnProperty("prop3")
          .that.is.an("object")
          .that.haveOwnProperty("nested")
          .that.is.a("number")
          .that.equals(123)
        expect(response)
          .to.haveOwnProperty("prop4")
          .that.is.an("array")
          .that.has.length(2)
        expect(response.prop4[0])
          .to.be.a("string")
          .that.equals("123")
        expect(response.prop4[1])
          .to.be.a("number")
          .that.equals(123)
      })
  })

  it("delete route basic", async () => {
    const dbResource = await model.create({
      prop1: "something"
    })

    await request(app)
      .delete(`/test/${dbResource._id}`)
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response._id).to.be.equal(dbResource._id.toString())
        expect(response)
          .to.haveOwnProperty("prop1")
          .that.is.a("string")
          .that.equals("something")
      })
    const newDbResource = await model.find()
    expect(newDbResource).to.have.lengthOf(0)
  })

  it("validate route", async () => {
    await request(app)
      .post(`/test/validate`)
      .send({
        prop5: "invalid"
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response)
          .to.be.an("array")
          .that.have.lengthOf(1)
        expect(response[0])
          .to.haveOwnProperty("value")
          .that.equals("invalid")
        expect(response[0])
          .to.haveOwnProperty("location")
          .that.equals("body")
        expect(response[0])
          .to.haveOwnProperty("field")
          .that.equals("prop5")
        expect(response[0])
          .to.haveOwnProperty("message")
          .that.equals("prop5 is invalid")
      })
  })
})
