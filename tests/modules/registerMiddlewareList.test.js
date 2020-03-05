const { expect } = require("chai");
const routeObject = require("../../src/restSchema/defaults/defaultRoute");
const registerMiddlewareList = require("../../src/restSchema/middleware/registerMiddlewareList");

describe("registerMiddlewareList middleware", () => {
  it("will return middleware if was a function", async () => {
    const func = () => {};
    const result = await registerMiddlewareList(
      {
        middleware: func
      },
      routeObject
    );

    expect(result).to.be.equal(func);
  });

  it("return array of middleware if middleware was an array", async () => {
    const list = [() => {}, () => {}];
    const result = await registerMiddlewareList(
      {
        middleware: list
      },
      routeObject
    );

    expect(result).to.be.equal(list);
  });

  it("return global middleware list with global middleware", async () => {
    const list = {
      global: [() => {}, () => {}],
      update: [() => {}, () => {}],
      create: [() => {}, () => {}]
    };
    const result = await registerMiddlewareList(
      {
        middleware: list
      },
      {
        ...routeObject,
        name: "create"
      }
    );

    expect(result).to.includes(list.global[0]);
    expect(result).to.includes(list.global[1]);
    expect(result).to.includes(list.create[0]);
    expect(result).to.includes(list.create[0]);
    expect(result).to.not.include(list.update[0]);
    expect(result).to.not.include(list.update[0]);
  });
});
