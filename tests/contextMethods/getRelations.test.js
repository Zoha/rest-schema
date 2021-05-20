const { expect } = require("chai")
const createContext = require("../../src/restSchema/createContext")
const defaultRoute = require("../../src/restSchema/defaults/defaultRoute")
const defaultSchema = require("../../src/restSchema/defaults/defaultSchema")
const relationTypes = require("../../src/restSchema/enums/relationTypes")
const { ObjectId } = require("../../src/restSchema/types")

describe("getRelations method", () => {
  it("will return relations normally", async () => {
    const context = createContext(
      {
        ...defaultSchema,
        fields: {
          prop1: {
            type: ObjectId,
            ref: "something",
            loadable: true
          },
          arr: [
            {
              hidedProp: {
                type: ObjectId,
                loadable: true,
                ref: "something",
                hide: true
              }
            }
          ],
          something: {
            type: {
              nested: {
                type: ObjectId,
                ref: "something",
                loadable: false
              }
            }
          }
        }
      },
      defaultRoute
    )

    context.inputs = {}

    const relations = await context.getRelations()

    expect(relations).to.have.lengthOf(3)
  })

  it("check that relations with same field name will be converted to one relation", async () => {
    const context = createContext(
      {
        ...defaultSchema,
        fields: {
          prop1: {
            type: ObjectId,
            ref: "something",
            loadable: true
          },
          arr: [
            {
              prop1: {
                type: ObjectId,
                loadable: true,
                ref: "something",
                hide: true
              }
            }
          ],
          something: {
            type: {
              nested: {
                type: ObjectId,
                ref: "something",
                loadable: false
              }
            }
          }
        }
      },
      defaultRoute
    )

    context.inputs = {}

    const relations = await context.getRelations()

    expect(relations).to.have.lengthOf(3)
  })

  it("check that array of relations will be considered as one relation", async () => {
    const context = createContext(
      {
        ...defaultSchema,
        fields: {
          nested: [
            {
              type: ObjectId,
              ref: "something",
              loadable: true
            }
          ]
        }
      },
      defaultRoute
    )

    context.inputs = {}

    const relations = await context.getRelations()

    expect(relations).to.have.lengthOf(1)
    expect(relations[0].fieldName).to.be.equal("nested")
    expect(relations[0].type).to.be.equal(relationTypes.collection)
  })
})
