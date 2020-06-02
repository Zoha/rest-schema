const { RestSchemaError } = require("../../errors")

module.exports = {
  response(response, context) {
    if (typeof response === "object") {
      return context.res.json(response)
    }
    return context.res.send(response)
  },
  error(error, context, req, res, next) {
    if (error instanceof RestSchemaError) {
      return error.handler(context, req, res, next)
    }
    return next(error)
  }
}
