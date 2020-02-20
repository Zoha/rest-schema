const { expect } = require("chai");
const getUpdateInputs = require("../../src/restSchema/contextMethods/getUpdateInputs");
const defaultField = require("../../src/restSchema/defaults/defaultField");
const cast = require("../../src/restSchema/helpers/cast");
const getUpdateFields = require("../../src/restSchema/contextMethods/getUpdateFields");
const getInputsFromFields = require("../../src/restSchema/contextMethods/getInputsFromFields");
const updateResource = require("../../src/restSchema/contextMethods/updateResource");
const model = require("../../src/testHelpers/model");

const getResource = async function() {
  return await model.findOne({
    _id: this.resource._id
  });
};

const schema = {
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
    const context = {
      schema,
      resource,
      getResource,
      model,
      cast,
      getInputsFromFields,
      getUpdateFields,
      getUpdateInputs,
      updateResource,
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
    const context = {
      schema,
      resource,
      getResource,
      model,
      cast,
      getInputsFromFields,
      getUpdateFields,
      getUpdateInputs,
      updateResource,
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
