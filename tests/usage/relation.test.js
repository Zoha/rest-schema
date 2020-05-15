/* eslint-disable no-underscore-dangle */
const { expect } = require("chai")
const express = require("express")
const request = require("supertest")
const bodyParser = require("body-parser")
const UserModel = require("../../src/testHelpers/userModel")
const ProfileModel = require("../../src/testHelpers/profileModel")
const RoleModel = require("../../src/testHelpers/roleModel")
const expressErrorHandler = require("../../src/testHelpers/expressErrorHandler")
const restModel = require("../../src/restSchema/schema")
const { ObjectId } = require("../../src/restSchema/types")
const { definedSchemaList } = require("../../src/restSchema/getSchemaModel")

const app = express()

const User = restModel(UserModel, {
  profile: {
    type: ObjectId,
    ref: "Profile"
  },
  role: {
    type: ObjectId,
    ref: "Role"
  }
})

const Profile = restModel(ProfileModel, {
  user: {
    type: ObjectId,
    ref: "User"
  }
})

const Role = restModel(RoleModel, {
  users: [
    {
      type: ObjectId,
      ref: "User"
    }
  ]
})

const CustomProfileFinderUser = restModel(
  UserModel,
  {
    profile: {
      type: ObjectId,
      ref: "Profile",
      find: () => ({
        name: "nameForFind"
      })
    }
  },
  {
    name: "customUserModelName"
  }
)

describe("test relation routes", () => {
  beforeEach(async () => {
    await UserModel.deleteMany()
    await ProfileModel.deleteMany()
    await RoleModel.deleteMany()
    app.use(bodyParser.json())
    app.use("/users", User.resource())
    app.use("/profiles", Profile.resource())
    app.use("/roles", Role.resource())
    app.use("/customProfileFinderUser", CustomProfileFinderUser.resource())
    app.use(expressErrorHandler)
  })

  it("single to single relation", async () => {
    const profile = await ProfileModel.create({})
    const user = await UserModel.create({
      profile: profile._id
    })
    await request(app)
      .get(`/users/${user._id}/profile`)
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response).to.haveOwnProperty("_id")
      })
    await request(app)
      .get(`/users/${user._id}/profile/user`)
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response._id).to.be.equals(user._id.toString())
        expect(response)
          .to.haveOwnProperty("profile")
          .that.equals(profile._id.toString())
      })

    await request(app)
      .get(`/users/${user._id}/profile/user/profile`)
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response._id).to.be.equals(profile._id.toString())
      })

    await request(app)
      .get(`/profiles/${profile._id}/user`)
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response._id).to.be.equals(user._id.toString())
      })
  })

  it("if resource not founded will pass to next route", async () => {
    const profile = await ProfileModel.create({})
    const user = await UserModel.create({
      profile: profile._id
    })
    await request(app)
      .get(`/users/notExists/profile`)
      .expect(404)
  })

  it("single relation with custom find method on field", async () => {
    const profile = await ProfileModel.create({})
    const user = await UserModel.create({
      profile: profile._id
    })
    const profile2 = await ProfileModel.create({
      name: "nameForFind"
    })

    // this will find profile 2 instead of profile 1 because
    // we are using custom finder user resource that
    // will find profile that its name equals nameForFind
    await request(app)
      .get(`/customProfileFinderUser/${user._id}/profile`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response._id).to.be.equal(profile2._id.toString())
      })
  })

  it("single to many relations", async () => {
    const role = await RoleModel.create({
      name: "admin"
    })

    const user1 = await UserModel.create({
      role: role._id
    })

    const user2 = await UserModel.create({
      role: role._id
    })

    await request(app)
      .get(`/roles/${role._id}/users`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response).to.have.lengthOf(2)
        expect(response[0]._id).to.be.equal(user1._id.toString())
      })

    await request(app)
      .get(`/roles/${role._id}/users/${user2._id}`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response._id).to.be.equal(user2._id.toString())
      })

    await request(app)
      .get(`/roles/${role._id}/users/${user2._id}/role`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response._id).to.be.equal(role._id.toString())
      })
  })
})
