const RestSchemaError = require("./restSchemaError")

class InvalidArgumentError extends RestSchemaError {
  /**
   *
   * @param {import("../../../typeDefs/context").context} context
   * @param {import("../../../typeDefs/context").request} req
   * @param {import("../../../typeDefs/context").response} res
   */
  handler(context, req, res) {}
}

module.exports = InvalidArgumentError
