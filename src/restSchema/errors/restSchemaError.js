class RestSchemaError extends Error {
  handler(context, req, res) {
    return res.status(500).json({
      message: this.message
    })
  }
}

module.exports = RestSchemaError
