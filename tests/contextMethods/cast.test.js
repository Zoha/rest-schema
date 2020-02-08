const { expect } = require("chai");
const cast = require("../../src/restSchema/contextMethods/cast");
const types = require("../../src/restSchema/types");

describe("cast method", function() {
  it("will convert value to different types", () => {
    expect(cast(2, String)).to.be.a("string");
    expect(cast("2", Object)).to.be.a("object");
    expect(cast("2", Array)).to.be.a("array");
    expect(cast("2", Number)).to.be.a("number");
    expect(cast("2", types.ObjectId)).to.be.a("null");
    expect(cast("2020", Date)).to.be.a("date");
    expect(cast("false", Boolean))
      .to.be.a("boolean")
      .that.equals(false);
    expect(cast("2020", "ignore")).to.be.a("string");
    expect(cast(2020, "ignore")).to.be.a("number");
  });
});
