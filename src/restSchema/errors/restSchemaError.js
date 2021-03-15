class RestSchemaError extends Error {
  /**
   *
   * @param {import("../../../typeDefs/context").context} context
   * @param {import("../../../typeDefs/context").request} req
   * @param {import("../../../typeDefs/context").response} res
   */
  handler(context, req, res) {
    return res.status(500).json({
      message: this.message
    })
  }
}

module.exports = RestSchemaError
