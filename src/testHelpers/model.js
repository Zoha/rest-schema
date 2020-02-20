const mongoose = require("./mongoose");
const Mixed = mongoose.Schema.Types.Mixed;

const model = mongoose.model("TestModelRS", {
  prop1: Mixed,
  prop2: Mixed,
  prop3: Mixed,
  prop4: Mixed,
  prop5: Mixed
});
module.exports = model;
