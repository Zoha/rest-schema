const { expect } = require("chai");
const findLocationOfInput = require("../../src/restSchema/contextMethods/findLocationOfInput");

const context = {
  routeObject: {
    inputsTarget: ["query", "body"]
  },
  req: {
    query: {
      prop1: "something",
      prop2: "something"
    },
    body: {
      prop2: "something",
      prop3: "something",
      nested: {
        nested: [
          {
            nested: "something"
          }
        ]
      }
    }
  }
};

describe("findLocationOfInput method", function() {
  it("find location of input normal", async () => {
    const locationOfProp1 = findLocationOfInput.call(context, "prop1");
    const locationOfProp2 = findLocationOfInput.call(context, "prop2");
    const locationOfProp3 = findLocationOfInput.call(context, "prop3");
    const locationOfProp4 = findLocationOfInput.call(
      context,
      "nested.nested.0.nested"
    );
    expect(locationOfProp1).to.be.equal("query");
    expect(locationOfProp2).to.be.equal("body");
    expect(locationOfProp3).to.be.equal("body");
    expect(locationOfProp4).to.be.equal("body");
  });
});
