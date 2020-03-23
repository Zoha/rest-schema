const { expect } = require("chai")
const defaultRouteObject = require("../../src/restSchema/defaults/defaultRoute")
const getNestedField = require("../../src/restSchema/contextMethods/getNestedField")
const getFilters = require("../../src/restSchema/contextMethods/getFilters")
const defaultField = require("../../src/restSchema/defaults/defaultField")
const cast = require("../../src/restSchema/helpers/cast")
const getCustomFilters = require("../../src/restSchema/contextMethods/getCustomFilters")
const getRoutes = require("../../src/restSchema/contextMethods/getRoutes")

const context = {
  inputs: {},
  getRoutes,
  getCustomFilters,
  routeObject: {
    ...defaultRouteObject
  },
  schema: {
    routes: [],
    filters: {},
    pagination: {
      defaultFilters: {}
    }
  },
  getNestedField,
  cast
}

describe("getFilters method", () => {
  it("will get filters normally", async () => {
    const result = await getFilters.call(context)
    expect(result).to.be.an("object")
  })

  it("will get filters with single filter", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        },
        prop2: {
          ...defaultField,
          type: String
        },
        prop3: {
          ...defaultField,
          type: String,
          filterable: false
        }
      },
      inputs: {
        prop1: "50",
        prop2: 10,
        prop3: "something"
      }
    })
    expect(result).to.be.an("object")
    expect(result.prop1).to.be.equal(50)
    expect(result.prop2).to.be.equal("10")
    expect(result).to.not.haveOwnProperty("prop3")
  })

  it("will not filter by meta keys", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        sort: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: 5
      }
    })
    expect(result).to.be.an("object")
    expect(result).to.not.haveOwnProperty("prop1")
  })

  it("will filter result with eq operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$eq:10"
      }
    })

    // eq operator
    expect(result).to.be.an("object")
    expect(result.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$eq")
    expect(result.prop1.$eq).to.be.equal(10)
  })

  it("will filter result with gt operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$gt:10"
      }
    })

    // gt operator
    expect(result).to.be.an("object")
    expect(result.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$gt")
    expect(result.prop1.$gt).to.be.equal(10)
  })

  it("will filter result with gte operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$gte:10"
      }
    })

    // gte operator
    expect(result).to.be.an("object")
    expect(result.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$gte")
    expect(result.prop1.$gte).to.be.equal(10)
  })

  it("will filter result with in operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$in:10,11"
      }
    })

    // in operator
    expect(result).to.be.an("object")
    expect(result.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$in")
    expect(result.prop1.$in)
      .to.be.an("array")
      .that.have.lengthOf(2)
    expect(result.prop1.$in[0]).to.be.a("number")
  })

  it("will filter result with lt operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$lt:10"
      }
    })

    // lt operator
    expect(result).to.be.an("object")
    expect(result.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$lt")
    expect(result.prop1.$lt).to.be.equal(10)
  })

  it("will filter result with lte operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$lte:10"
      }
    })

    // lte operator
    expect(result).to.be.an("object")
    expect(result.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$lte")
    expect(result.prop1.$lte).to.be.equal(10)
  })

  it("will filter result with ne operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$ne:10"
      }
    })

    // ne operator
    expect(result).to.be.an("object")
    expect(result.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$ne")
    expect(result.prop1.$ne).to.be.equal(10)
  })

  it("will filter result with nin operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$nin:10,11"
      }
    })

    // nin operator
    expect(result).to.be.an("object")
    expect(result.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$nin")
    expect(result.prop1.$nin)
      .to.be.an("array")
      .that.have.lengthOf(2)
    expect(result.prop1.$nin[0]).to.be.a("number")
  })

  it("will filter result with exists operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$exists"
      }
    })

    // exists operator
    expect(result).to.be.an("object")
    expect(result.prop1).to.be.an("object")
    expect(result.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$exists")
    expect(result.prop1.$exists)
      .to.be.a("boolean")
      .and.to.be.equal(true)
  })

  it("will filter result with notExists operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$notExists"
      }
    })

    // notExists operator
    expect(result).to.be.an("object")
    expect(result.prop1).to.be.an("object")
    expect(result.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$exists")
    expect(result.prop1.$exists)
      .to.be.a("boolean")
      .and.to.be.equal(false)
  })

  it("will filter result with null operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$null"
      }
    })

    // null operator
    expect(result).to.be.an("object")
    expect(result.prop1).to.be.equal(null)
  })

  it("will filter result with regex operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$regex:10"
      }
    })

    // regex operator
    expect(result).to.be.an("object")
    expect(result.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$regex")
    expect(result.prop1.$regex).to.be.instanceOf(RegExp)
  })

  it("will filter result with regexi operator", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$regexi:10"
      }
    })

    // regexi operator
    expect(result).to.be.an("object")
    expect(result.prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$regex")
    expect(result.prop1.$regex).to.be.instanceOf(RegExp)
  })

  it("will filter result nested property", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          isNested: true,
          isObjectNested: true,
          children: {
            nested: {
              ...defaultField,
              type: Number
            }
          }
        }
      },
      inputs: {
        "prop1.nested": "10"
      }
    })

    // regexi operator
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("prop1.nested")
      .that.equals(10)
  })

  it("will filter result with multiple operators in one property with and logic", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$in:10,11,$ne:2"
      }
    })

    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("$and")
    expect(result.$and)
      .to.be.an("array")
      .that.have.lengthOf(2)
    expect(result.$and[0])
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
    expect(result.$and[0].prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$in")
    expect(result.$and[0].prop1.$in)
      .to.be.an("array")
      .that.have.lengthOf(2)
    expect(result.$and[0].prop1.$in[1])
      .to.be.an("number")
      .that.equals(11)
    expect(result.$and[1])
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
    expect(result.$and[1].prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$ne")
  })

  it("will filter result with multiple operators in one property with or logic", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$in:10,11|$ne:2"
      }
    })

    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("$or")
    expect(result.$or)
      .to.be.an("array")
      .that.have.lengthOf(2)
    expect(result.$or[0])
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
    expect(result.$or[0].prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$in")
    expect(result.$or[0].prop1.$in)
      .to.be.an("array")
      .that.have.lengthOf(2)
    expect(result.$or[0].prop1.$in[1])
      .to.be.an("number")
      .that.equals(11)
    expect(result.$or[1])
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
    expect(result.$or[1].prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$ne")
  })

  it("will filter result with multiple operators in one property with or logic", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Number
        }
      },
      inputs: {
        prop1: "$in:10,11|$ne:2",
        $or: [{ prop1: "$in:1,2" }, { prop1: "$lt:3$gt:1" }]
      }
    })

    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("$or")
    expect(result.$or)
      .to.be.an("array")
      .that.have.lengthOf(4)
    expect(result.$or[0])
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
    expect(result.$or[0].prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$in")
    expect(result.$or[0].prop1.$in)
      .to.be.an("array")
      .that.have.lengthOf(2)
    expect(result.$or[0].prop1.$in[1])
      .to.be.an("number")
      .that.equals(11)
    expect(result.$or[1])
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
    expect(result.$or[1].prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$ne")

    expect(result.$or[2])
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
    expect(result.$or[2].prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$in")
    expect(result.$or[2].prop1.$in)
      .to.be.an("array")
      .that.have.lengthOf(2)

    expect(result.$or[3])
      .to.be.an("object")
      .that.haveOwnProperty("$and")
    expect(result.$or[3].$and)
      .to.be.an("array")
      .that.lengthOf(2)
    expect(result.$or[3].$and[0])
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
    expect(result.$or[3].$and[1].prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$gt")
    expect(result.$or[3].$and[0].prop1)
      .to.be.an("object")
      .that.haveOwnProperty("$lt")
    expect(result.$or[3].$and[1].prop1.$gt)
      .to.be.an("number")
      .that.equals(1)
    expect(result.$or[3].$and[0].prop1.$lt)
      .to.be.an("number")
      .that.equals(3)
  })

  it("will not filter result if type was not defined", async () => {
    const result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: undefined
        }
      },
      inputs: {
        prop1: "something"
      }
    })

    // nin operator
    expect(result)
      .to.be.an("object")
      .that.not.haveOwnProperty("prop1")
  })

  it("will merge default filters", async () => {
    const result = await getFilters.call({
      ...context,
      schema: {
        routes: [],
        filters: {
          prop3: "custom"
        },
        pagination: {
          defaultFilters: {
            prop1: "default",
            prop2: "default",
            prop3: "default"
          }
        }
      },
      fields: {
        prop1: {
          ...defaultField,
          type: String
        }
      },
      inputs: {
        prop1: "something"
      }
    })

    // nin operator
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("prop1")
      .that.equals("something")
    expect(result)
      .to.haveOwnProperty("prop2")
      .that.equals("default")
    expect(result)
      .to.haveOwnProperty("prop3")
      .that.equals("custom")
  })

  it("will returns filters for date", async () => {
    let result = await getFilters.call({
      ...context,
      fields: {
        prop1: {
          ...defaultField,
          type: Date
        }
      },
      inputs: {
        prop1: "$gte:2019,$lte:2018"
      }
    })

    result = JSON.parse(JSON.stringify(result))

    // nin operator
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("$and")
    expect(result.$and[0])
      .to.haveOwnProperty("prop1")
      .that.is.an("object")
      .that.haveOwnProperty("$gte")
      .that.includes("2019")
    expect(result.$and[1])
      .to.haveOwnProperty("prop1")
      .that.is.an("object")
      .that.haveOwnProperty("$lte")
      .that.includes("2018")
  })
})
