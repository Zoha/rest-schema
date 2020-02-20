const { expect } = require("chai");
const sanitizeInput = require("../../src/restSchema/contextMethods/sanitizeInput");
const sanitizeInputs = require("../../src/restSchema/contextMethods/sanitizeInputs");
const getFields = require("../../src/restSchema/contextMethods/getFields");

const context = {
  route: "create",
  sanitizeInput,
  getFields
};

describe("sanitizeInputs method", () => {
  it("will apply sanitizers normally", async () => {
    const sanitized = await sanitizeInputs.call({
      ...context,
      schema: {
        fields: {
          prop1: {
            type: String,
            lowercase: true,
            trim: true,
            sanitize: (val, context) => {
              return val + "-" + context.route;
            }
          },
          prop2: [
            {
              type: String,
              lowercase: true,
              trim: true,
              sanitize: (val, context) => {
                return val + "-" + context.route;
              }
            }
          ],
          prop3: {
            type: {
              nested: {
                type: String,
                uppercase: true,
                trim: true,
                sanitize: (val, context) => {
                  return val + "-" + context.route;
                }
              }
            }
          }
        }
      },
      inputs: {
        prop1: " HELLO ",
        prop2: ["  HELLO  "],
        prop3: {
          nested: "hello   "
        }
      }
    });

    expect(sanitized)
      .to.haveOwnProperty("prop1")
      .to.be.equal("hello-create");
    expect(sanitized)
      .to.haveOwnProperty("prop2")
      .that.is.an("array");
    expect(sanitized.prop2[0]).to.be.equal("hello-create");
    expect(sanitized.prop3)
      .to.haveOwnProperty("nested")
      .to.be.equal("HELLO-create");
  });
});
