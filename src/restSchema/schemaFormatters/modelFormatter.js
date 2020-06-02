const mongoose = require("mongoose")
const mongooseModelWrapper = require("../modelWrappers/mongooseModel")
const { InvalidArgumentError } = require("../errors")

module.exports = model => {
  if (model.prototype instanceof mongoose.Model) {
    return mongooseModelWrapper(model)
  }
  throw new InvalidArgumentError("model is invalid")
}
