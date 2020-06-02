const RestSchemaError = require("./restSchemaError")
const ValidationError = require("./validationError")
const NotFoundError = require("./notFoundError")
const InvalidArgumentError = require("./invalidArgumentError")

module.exports = {
  RestSchemaError,
  Error: RestSchemaError,
  ValidationError,
  NotFoundError,
  InvalidArgumentError
}
