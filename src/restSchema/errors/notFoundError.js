const RestSchemaError = require("./restSchemaError")

class NotFoundError extends RestSchemaError {
  /**
   *
   * @param {import("../../../typeDefs/context").context} context
   * @param {import("../../../typeDefs/context").request} req
   * @param {import("../../../typeDefs/context").response} res
   */
  handler(context, req, res) {
    return res.status(404).json({
      message: this.message
    })
  }
}

module.exports = NotFoundError
