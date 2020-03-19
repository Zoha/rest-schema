const { expect } = require("chai");
const getCreateInputs = require("../../src/restSchema/contextMethods/getCreateInputs");
const defaultField = require("../../src/restSchema/defaults/defaultField");
const cast = require("../../src/restSchema/helpers/cast");
const getCreateFields = require("../../src/restSchema/contextMethods/getCreateFields");
const getInputsFromFields = require("../../src/restSchema/contextMethods/getInputsFromFields");
const getFields = require("../../src/restSchema/contextMethods/getFields");

describe("getCreateInputs method", function() {
  it("will get inputs normally", async () => {
    const fields = {
      prop1: {
        ...defaultField
      }
    };

    const inputs = {
      prop1: "something"
    };
    const context = {
      fields,
      inputs,
      getCreateFields,
      getInputsFromFields,
      getFields,
      cast
    };
    const fieldsInputs = await getCreateInputs.call(context);

    expect(fieldsInputs)
      .to.haveOwnProperty("prop1")
      .that.equals("something");

    expect(context)
      .to.haveOwnProperty("createInputs")
      .that.is.an("object");
  });

  it("will not change context if setCreateInputs passed as false", async () => {
    const fields = {
      prop1: {
        ...defaultField
      }
    };

    const inputs = {
      prop1: "something"
    };
    const context = {
      fields,
      inputs,
      getCreateFields,
      getInputsFromFields,
      getFields,
      cast
    };
    const fieldsInputs = await getCreateInputs.call(context, {
      setCreateInputs: false
    });

    expect(fieldsInputs)
      .to.haveOwnProperty("prop1")
      .that.equals("something");

    expect(context).to.not.haveOwnProperty("createInputs");
  });
});
