/* eslint-disable no-underscore-dangle */
const { expect } = require("chai")
const express = require("express")
const request = require("supertest")
const bodyParser = require("body-parser")
const UserModel = require("../../src/testHelpers/UserModel")
const ProfileModel = require("../../src/testHelpers/ProfileModel")
const RoleModel = require("../../src/testHelpers/roleModel")
const CommentModel = require("../../src/testHelpers/commentModel")
const PermissionModel = require("../../src/testHelpers/permissionModel")
const expressErrorHandler = require("../../src/testHelpers/expressErrorHandler")
const restModel = require("../../src/restSchema/schema")
const { ObjectId } = require("../../src/restSchema/types")

const app = express()

const sleep = async time => {
  return new Promise(resolve => setTimeout(resolve, time))
}

const User = restModel(UserModel, {
  profile: {
    type: ObjectId,
    ref: "Profile"
  },
  role: {
    type: ObjectId,
    ref: "Role"
  },
  comments: [
    {
      type: ObjectId,
      ref: "Comment"
    }
  ]
})

const Profile = restModel(ProfileModel, {
  user: {
    type: ObjectId,
    ref: "User"
  },
  field: {
    type: String
  }
})

const Role = restModel(RoleModel, {
  users: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  permissions: [
    {
      type: ObjectId,
      ref: "Permission"
    }
  ]
})

const Comment = restModel(CommentModel, {
  user: {
    type: ObjectId,
    ref: "User"
  }
})

const Permission = restModel(PermissionModel, {
  roles: [
    {
      type: ObjectId,
      ref: "Role"
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

describe("relation routes", () => {
  beforeEach(async () => {
    await UserModel.deleteMany()
    await ProfileModel.deleteMany()
    await RoleModel.deleteMany()
    await CommentModel.deleteMany()
    await PermissionModel.deleteMany()
    app.use(bodyParser.json())
    app.use("/users", User.resource())
    app.use("/profiles", Profile.resource())
    app.use("/roles", Role.resource())
    app.use("/comments", Comment.resource())
    app.use("/permissions", Permission.resource())
    app.use("/customProfileFinderUser", CustomProfileFinderUser.resource())
    app.use(expressErrorHandler)
  })

  it("single to single relation", async () => {
    const profile = await ProfileModel.create({
      field: "something"
    })
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
      .get(`/users/${user._id}/profile?select=field`)
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response).to.haveOwnProperty("field")
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
    await UserModel.create({
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

    const user2 = await UserModel.create({
      role: role._id
    })

    const user1 = await UserModel.create({
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
      .get(`/roles/${role._id}/users?select=_id&_id=${user1._id}`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response).to.have.lengthOf(1)
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

  it("user and comments relations", async () => {
    const user2 = await UserModel.create({
      name: "username2"
    })
    await sleep(1)
    const user1 = await UserModel.create({
      name: "username1"
    })
    await sleep(1)
    const comment3 = await CommentModel.create({
      body: "comment3",
      user: user2
    })
    await sleep(1)
    const comment2 = await CommentModel.create({
      body: "comment2",
      user: user1
    })
    await sleep(1)
    const comment1 = await CommentModel.create({
      body: "comment1",
      user: user1
    })

    await request(app)
      .get(`/users/${user1._id}/comments`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response).to.have.lengthOf(2)
        expect(response[0]._id).to.be.equal(comment1._id.toString())
        expect(response[1]._id).to.be.equal(comment2._id.toString())
      })
    await request(app)
      .get(`/users/${user2._id}/comments`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response).to.have.lengthOf(1)
        expect(response[0]._id).to.be.equal(comment3._id.toString())
      })

    await request(app)
      .get(`/users/${user2._id}/comments/${comment3._id}`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response._id).to.be.equal(comment3._id.toString())
      })

    await request(app)
      .get(`/users/${user2._id}/comments/${comment3._id}/user`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response._id).to.be.equal(user2._id.toString())
      })

    await request(app)
      .get(`/comments/${comment3._id}/user`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response._id).to.be.equal(user2._id.toString())
      })
  })

  it("roles and permissions relation", async () => {
    const permission3 = await PermissionModel.create({
      name: "username1"
    })
    await sleep(1)
    const permission2 = await PermissionModel.create({
      name: "username1"
    })
    await sleep(1)
    const permission1 = await PermissionModel.create({
      name: "username1"
    })
    await sleep(1)
    const role2 = await RoleModel.create({
      name: "admin",
      permissions: [permission2, permission3]
    })
    await sleep(1)
    const role1 = await RoleModel.create({
      name: "admin",
      permissions: [permission1, permission2]
    })
    await sleep(1)
    const user = await UserModel.create({
      role: role1
    })

    await request(app)
      .get(`/permissions/${permission2._id}/roles`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response).to.have.lengthOf(2)
        expect(response[0]._id).to.be.equal(role1._id.toString())
        expect(response[1]._id).to.be.equal(role2._id.toString())
      })

    await request(app)
      .get(`/permissions/${permission1._id}/roles`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response).to.have.lengthOf(1)
        expect(response[0]._id).to.be.equal(role1._id.toString())
      })

    await request(app)
      .get(`/permissions/${permission2._id}/roles/${role2._id}/permissions`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response).to.have.lengthOf(2)
        expect(response[0]._id).to.be.equal(permission2._id.toString())
        expect(response[1]._id).to.be.equal(permission3._id.toString())
      })

    await request(app)
      .get(`/permissions/${permission1._id}/roles/${role1._id}/users`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response[0]._id).to.be.equal(user._id.toString())
      })

    await request(app)
      .get(`/roles/${role2._id}/permissions`)
      .expect(200)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response).to.have.lengthOf(2)
        expect(response[0]._id).to.be.equal(permission2._id.toString())
        expect(response[1]._id).to.be.equal(permission3._id.toString())
      })
  })

  it("single to single relation fails with maximum relation depth execution", async () => {
    const profile = await ProfileModel.create({
      field: "something"
    })
    const user = await UserModel.create({
      profile: profile._id
    })

    await request(app)
      .get(`/users/${user._id}/profile/user/profile/user`)
      .expect("Content-Type", /json/)
      .expect(res => {
        const response = JSON.parse(res.text)
        expect(response._id).to.be.equals(user._id.toString())
        expect(response)
          .to.haveOwnProperty("profile")
          .that.equals(profile._id.toString())
      })

    await request(app)
      .get(`/users/${user._id}/profile/user/profile/user/profile`)
      .expect("Content-Type", /json/)
      .expect(400)
  })
})
