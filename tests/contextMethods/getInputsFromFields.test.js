const { expect } = require("chai")
const getInputsFromFields = require("../../src/restSchema/contextMethods/getInputsFromFields")
const defaultField = require("../../src/restSchema/defaults/defaultField")
const cast = require("../../src/restSchema/helpers/cast")
const getFields = require("../../src/restSchema/contextMethods/getFields")
const defaults = require("../../src/restSchema/defaults")

describe("getInputsFromFields method", function() {
  it("will get inputs normally", async () => {
    const fields = {
      prop1: {
        ...defaultField
      },
      objectNested: {
        ...defaultField,
        type: Object,
        isNested: true,
        isObjectNested: true,
        children: {
          first: {
            ...defaultField,
            type: String
          },
          second: {
            ...defaultField,
            type: String
          }
        }
      },
      arrayNested: {
        ...defaultField,
        type: Array,
        isNested: true,
        children: [
          {
            ...defaultField,
            isNested: true,
            type: Object,
            children: {
              first: {
                ...defaultField,
                type: String
              },
              second: {
                ...defaultField,
                type: Number
              }
            }
          }
        ]
      }
    }

    const inputs = {
      prop1: "something",
      prop2: "something",
      objectNested: {
        first: "something",
        second: "something"
      },
      arrayNested: [
        {
          first: "something"
        },
        {
          first: "somethingElse",
          second: "1",
          somethingElse: "something"
        }
      ]
    }
    const context = {
      fields,
      inputs,
      defaults,
      cast
    }
    const fieldsInputs = await getInputsFromFields.call(context, fields)

    expect(fieldsInputs)
      .to.haveOwnProperty("prop1")
      .that.equals("something")

    expect(fieldsInputs).to.not.haveOwnProperty("prop2")

    expect(fieldsInputs)
      .to.haveOwnProperty("objectNested")
      .that.is.an("object")

    expect(fieldsInputs.objectNested)
      .to.haveOwnProperty("first")
      .and.to.not.haveOwnProperty("second")

    expect(fieldsInputs)
      .to.haveOwnProperty("arrayNested")
      .that.is.an("array")

    expect(fieldsInputs.arrayNested).to.have.lengthOf(2)

    expect(fieldsInputs.arrayNested[0]).to.haveOwnProperty("first")
    expect(fieldsInputs.arrayNested[0]).to.not.haveOwnProperty("second")

    expect(fieldsInputs.arrayNested[1]).to.haveOwnProperty("first")

    expect(fieldsInputs.arrayNested[1])
      .to.haveOwnProperty("second")
      .that.is.a("number")

    expect(fieldsInputs.arrayNested[1]).to.not.haveOwnProperty("somethingElse")
  })

  it("will get data with set method", async () => {
    const fields = {
      prop1: {
        ...defaultField,
        type: String,
        set: "prop1"
      },
      prop2: {
        ...defaultField,
        type: String,
        set: () => "prop2"
      },
      prop3: {
        ...defaultField,
        type: String,
        set: {
          create: "prop3"
        }
      },
      prop4: {
        ...defaultField,
        type: String,
        set: {
          create: () => "prop4"
        }
      },
      prop5: {
        ...defaultField,
        type: String,
        set: {
          notCreate: "prop5"
        }
      },
      prop6: {
        ...defaultField,
        type: String,
        set: "prop6"
      },
      prop7: {
        ...defaultField,
        type: String,
        set: () => "prop7"
      }
    }

    const inputs = {
      prop1: "something",
      prop2: "something",
      prop3: "something",
      prop4: "something"
    }

    const context = {
      route: "create",
      fields,
      inputs,
      cast,
      defaults
    }

    const fieldsInputs = await getInputsFromFields.call(context, fields)
    expect(fieldsInputs)
      .to.haveOwnProperty("prop1")
      .that.equal("prop1")
    expect(fieldsInputs)
      .to.haveOwnProperty("prop2")
      .that.equal("prop2")
    expect(fieldsInputs)
      .to.haveOwnProperty("prop3")
      .that.equal("prop3")
    expect(fieldsInputs)
      .to.haveOwnProperty("prop4")
      .that.equal("prop4")
    expect(fieldsInputs).to.not.haveOwnProperty("prop5")
    expect(fieldsInputs)
      .to.haveOwnProperty("prop6")
      .that.equal("prop6")
    expect(fieldsInputs).to.not.haveOwnProperty("prop7")
  })

  it("will get data with map type", async () => {
    const fields = await getFields.call(
      { defaults },
      {
        fields: {
          prop1: {
            type: Map,
            of: [String]
          }
        }
      }
    )

    const inputs = {
      prop1: {
        nested: [123, "452"]
      }
    }

    const context = {
      route: "create",
      fields,
      inputs,
      cast,
      defaults
    }

    const fieldsInputs = await getInputsFromFields.call(context, fields)

    expect(fieldsInputs)
      .to.haveOwnProperty("prop1")
      .that.haveOwnProperty("nested")
      .that.is.an("array")
      .that.have.lengthOf(2)

    expect(fieldsInputs.prop1.nested[0]).to.be.a("string")
    expect(fieldsInputs.prop1.nested[1]).to.be.a("string")
  })
})
