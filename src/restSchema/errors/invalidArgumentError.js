const RestSchemaError = require("./restSchemaError")

class InvalidArgumentError extends RestSchemaError {
  /**
   *
   * @param {import("../../../typeDefs/context").context} context
   * @param {import("../../../typeDefs/context").request} req
   * @param {import("../../../typeDefs/context").response} res
   */ // eslint-disable-next-line no-unused-vars
  handler(context, req, res) {}
}

module.exports = InvalidArgumentError
