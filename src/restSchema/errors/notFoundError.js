const RestSchemaError = require("./restSchemaError")

class NotFoundError extends RestSchemaError {
  handler(context, req, res) {
    return res.status(404).json({
      message: this.message
    })
  }
}

module.exports = NotFoundError
