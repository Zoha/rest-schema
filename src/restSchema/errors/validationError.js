const RestSchemaError = require("./restSchemaError")

class ValidationError extends RestSchemaError {
  /**
   *
   * @param {string} message
   * @param {import("../../../typeDefs/context").validationErrors} validationData
   */
  constructor(message, validationData) {
    super(message)
    this.validationData = validationData
  }
  /**
   *
   * @param {import("../../../typeDefs/context").context} context
   * @param {import("../../../typeDefs/context").request} req
   * @param {import("../../../typeDefs/context").response} res
   */
  handler(context, req, res) {
    return res.status(400).json(this.validationData)
  }
}

module.exports = ValidationError
