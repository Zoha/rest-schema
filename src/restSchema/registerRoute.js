const injectContext = require("./middleware/injectContext")
const registerMiddlewareList = require("./middleware/registerMiddlewareList")

module.exports = (router, routeObject, schema) => {
  // register middleware
  // some of middleware are with condition
  // and will be injected if route need them

  // inject context to request
  const middlewareList = [injectContext(schema, routeObject)]

  // inject middleware list
  middlewareList.push(registerMiddlewareList(schema, routeObject))

  // registering the route
  router[routeObject.method](routeObject.path, middlewareList, async (req, res, next) => {
    const context = req.rest
    try {
      const result = await routeObject.handler(context, req, res, next)
      if (!res.headersSent) {
        const response = result || context.response
        if (response != null) {
          return context.schema.wrappers.response(response, req, res, next)
        }
        return next()
      }
    } catch (err) {
      if (!res.headersSent) {
        return context.schema.wrappers.error(err, context, req, res, next)
      }
      return next(err)
    }
  })
}
