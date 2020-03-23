const mongoose = require("mongoose")
const mongooseModelWrapper = require("../modelWrappers/mongooseModel")

module.exports = model => {
  if (model.prototype instanceof mongoose.Model) {
    return mongooseModelWrapper(model)
  }
  throw new Error("model is invalid")
}
