const { expect } = require("chai");
const sanitizeInput = require("../../src/restSchema/contextMethods/sanitizeInput");

const context = {
  route: "create"
};

describe("sanitizeInput method", () => {
  it("will trim without any sanitizer", async () => {
    let sanitizers, value, result;
    sanitizers = {};
    value = "hello";
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.be.equal(value);
  });

  it("will trim input", async () => {
    let sanitizers, value, result;
    sanitizers = {
      trim: true
    };
    value = "  hello   ";
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.be.equal("hello");

    sanitizers = {
      trim: {
        create: true
      }
    };
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.be.equal("hello");

    sanitizers = {
      trim: {
        update: true
      }
    };
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.not.be.equal("hello");
  });

  it("will uppercase input", async () => {
    let sanitizers, value, result;
    sanitizers = {
      uppercase: true
    };
    value = "hello";
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.be.equal("HELLO");

    sanitizers = {
      uppercase: {
        create: true
      }
    };
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.be.equal("HELLO");

    sanitizers = {
      uppercase: {
        update: true
      }
    };
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.not.be.equal("HELLO");
  });

  it("will lowercase input", async () => {
    let sanitizers, value, result;
    sanitizers = {
      lowercase: true
    };
    value = "Hello";
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.be.equal("hello");

    sanitizers = {
      lowercase: {
        create: true
      }
    };
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.be.equal("hello");

    sanitizers = {
      lowercase: {
        update: true
      }
    };
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.not.be.equal("hello");
  });

  it("will apply custom sanitizer", async () => {
    let sanitizers, value, result;
    sanitizers = {
      sanitize: (val, context) => {
        return val + "-" + context.route;
      }
    };
    value = "hello";
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.be.equal("hello-create");

    sanitizers = {
      sanitize: {
        create: (val, context) => {
          return val + "-" + context.route;
        }
      }
    };
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.be.equal("hello-create");

    sanitizers = {
      sanitize: {
        update: (val, context) => {
          return val + "-" + context.route;
        }
      }
    };
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.not.be.equal("hello");
  });

  it("will do all together", async () => {
    let sanitizers, value, result;
    sanitizers = {
      trim: true,
      lowercase: true,
      sanitize: (val, context) => {
        return val + "-" + context.route;
      }
    };
    value = "    HELLO   ";
    result = await sanitizeInput.call(context, value, sanitizers);
    expect(result).to.be.equal("hello-create");
  });
});
