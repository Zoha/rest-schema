class RestSchemaError extends Error {
  constructor(...args) {
    super(...args)
    this.status = 500
  }
  /**
   *
   * @param {import("../../../typeDefs/context").context} context
   * @param {import("../../../typeDefs/context").request} req
   * @param {import("../../../typeDefs/context").response} res
   */
  handler(context, req, res) {
    return res.status(this.status).json({
      message: this.message
    })
  }
}

module.exports = RestSchemaError
