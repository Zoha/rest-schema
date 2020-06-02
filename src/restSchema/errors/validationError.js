const RestSchemaError = require("./restSchemaError")

class ValidationError extends RestSchemaError {
  constructor(message, validationData) {
    super(message)
    this.validationData = validationData
  }
  handler(context, req, res) {
    return res.status(400).json(this.validationData)
  }
}

module.exports = ValidationError
