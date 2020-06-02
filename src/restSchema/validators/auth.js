const { InvalidArgumentError } = require("../errors")

module.exports = async (value, callback, field, context) => {
  if (!callback || typeof callback != "function") {
    throw new InvalidArgumentError("auth validator should be a function")
  }
  return !!(await callback(value, context))
}
