const getResource = require("../../src/restSchema/contextMethods/getResource");
const cast = require("../../src/restSchema/contextMethods/cast");
const getFields = require("../../src/restSchema/contextMethods/getFields");
const model = require("../../src/testHelpers/model");
const { expect } = require("chai");
const getNestedField = require("../../src/restSchema/contextMethods/getNestedField");
const getCustomFilters = require("../../src/restSchema/contextMethods/getCustomFilters");
const defaultRoute = require("../../src/restSchema/defaults/defaultRoute");
const { ObjectId } = require("../../src/restSchema/types");

const context = {
  cast,
  getFields,
  getNestedField,
  getCustomFilters,
  model,
  getRoutes: () => [defaultRoute],
  getRouteKeys: () => ["prop1", "_id"],
  req: {
    params: {
      id: "prop1"
    }
  },
  route: "create",
  schema: {
    fields: {
      prop1: String
    },
    filters: {}
  },
  route: "create"
};

describe("getResource method", () => {
  beforeEach(async () => {
    await model.deleteMany();
  });

  it("will return resource normally", async () => {
    const resource = await model.create({
      prop1: "prop1"
    });

    let result = await getResource.call(context);
    result = result.toObject();
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("_id");

    result = await getResource.call({
      ...context,
      fields: undefined,
      req: {
        params: { id: result._id.toString() }
      },
      schema: {
        fields: {
          _id: ObjectId,
          prop1: String
        },
        filters: {}
      }
    });

    result = result.toObject();
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("_id");
  });

  it("will return resource with changing the type", async () => {
    const resource = await model.create({
      prop1: "1"
    });

    result = await getResource.call({
      ...context,
      fields: undefined,
      req: {
        params: { id: "1" }
      },
      schema: {
        fields: {
          prop1: String
        },
        filters: {}
      }
    });

    result = result.toObject();
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("_id");
  });

  it("will return resource with nested property", async () => {
    const resource = await model.create({
      prop1: {
        nested: 1
      }
    });

    result = await getResource.call({
      ...context,
      fields: undefined,
      getRouteKeys: () => ["prop1.nested"],
      req: {
        params: { id: "1" }
      },
      schema: {
        fields: {
          prop1: {
            type: {
              nested: Number
            }
          }
        },
        filters: {}
      }
    });

    result = result.toObject();
    expect(result)
      .to.be.an("object")
      .that.haveOwnProperty("_id");
  });
});
