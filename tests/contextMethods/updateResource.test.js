const { expect } = require("chai");
const defaultField = require("../../src/restSchema/defaults/defaultField");
const updateResource = require("../../src/restSchema/contextMethods/updateResource");
const defaultRoute = require("../../src/restSchema/defaults/defaultRoute");
const model = require("../../src/testHelpers/model");
const createContext = require("../../src/restSchema/createContext");
const defaultSchema = require("../../src/restSchema/defaults/defaultSchema");

const schema = {
  ...defaultSchema,
  model
};

const inputs = {
  prop1: "something",
  prop2: "something"
};

describe("updateResource method", function() {
  beforeEach(async () => {
    await model.deleteMany({});
  });
  it("will update resource normally", async () => {
    const resource = await model.create({
      prop1: "test"
    });
    defaultContext = await createContext(schema, defaultRoute);
    const context = {
      ...defaultContext,
      req: {
        params: { id: "test" }
      },
      resource,
      getRouteKeys: () => ["prop1", "_id"],
      fields: {
        prop1: {
          ...defaultField
        }
      },
      inputs
    };
    const updatedResource = await updateResource.call(context);

    expect(context).to.haveOwnProperty("updatedResource");
    expect(context).to.haveOwnProperty("resource");

    const dbResources = await model.find();
    expect(dbResources).to.have.lengthOf(1);
    const dbResource = dbResources[0].toObject();
    expect(dbResource.prop1).to.be.equal(updatedResource.prop1);
    expect(dbResource).to.not.haveOwnProperty("prop2");
  });

  it("will not change context if set updatedResource passed as false", async () => {
    const resource = await model.create({
      prop1: "test"
    });
    defaultContext = await createContext(schema, defaultRoute);
    const context = {
      ...defaultContext,
      req: {
        params: { id: "test" }
      },
      resource,
      getRouteKeys: () => ["prop1", "_id"],
      fields: {
        prop1: {
          ...defaultField
        }
      },
      inputs
    };
    const updatedResource = await updateResource.call(context, {
      setUpdatedResource: false
    });
    expect(context).to.not.haveOwnProperty("updatedResource");
    expect(context).to.haveOwnProperty("resource");
  });
});
