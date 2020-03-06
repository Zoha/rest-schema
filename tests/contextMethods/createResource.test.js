const { expect } = require("chai");
const getCreateInputs = require("../../src/restSchema/contextMethods/getCreateInputs");
const defaultField = require("../../src/restSchema/defaults/defaultField");
const cast = require("../../src/restSchema/helpers/cast");
const getCreateFields = require("../../src/restSchema/contextMethods/getCreateFields");
const getInputsFromFields = require("../../src/restSchema/contextMethods/getInputsFromFields");
const createResource = require("../../src/restSchema/contextMethods/createResource");
const model = require("../../src/testHelpers/model");
const hook = require("../../src/restSchema/contextMethods/hook");

const schema = {
  model,
  hooks: {}
};

const inputs = {
  prop1: "something",
  prop2: "something"
};

describe("createResource method", function() {
  beforeEach(async () => {
    await model.deleteMany({});
  });
  it("will create resource normally", async () => {
    const context = {
      schema,
      model,
      cast,
      hook,
      getInputsFromFields,
      getCreateFields,
      getCreateInputs,
      createResource,
      fields: {
        prop1: {
          ...defaultField
        }
      },
      inputs
    };
    const createdResource = await createResource.call(context);

    expect(context).to.haveOwnProperty("createdResource");
    expect(context).to.haveOwnProperty("resource");

    const dbResources = await model.find();
    expect(dbResources).to.have.lengthOf(1);
    const dbResource = dbResources[0].toObject();
    expect(dbResource.prop1).to.be.equal(createdResource.prop1);
    expect(dbResource).to.not.haveOwnProperty("prop2");
  });

  it("will not change context if set resource passed as false", async () => {
    const context = {
      schema,
      model,
      cast,
      hook,
      getInputsFromFields,
      getCreateFields,
      getCreateInputs,
      createResource,
      fields: {
        prop1: {
          ...defaultField
        }
      },
      inputs
    };
    const createdResource = await createResource.call(context, {
      setResource: false
    });
    expect(context).to.haveOwnProperty("createdResource");
    expect(context).to.not.haveOwnProperty("resource");
  });

  it("will not change context if set createdResource passed as false", async () => {
    const context = {
      schema,
      model,
      cast,
      hook,
      getInputsFromFields,
      getCreateFields,
      getCreateInputs,
      createResource,
      fields: {
        prop1: {
          ...defaultField
        }
      },
      inputs
    };
    const createdResource = await createResource.call(context, {
      setCreatedResource: false
    });
    expect(context).to.not.haveOwnProperty("createdResource");
    expect(context).to.haveOwnProperty("resource");
  });
});
