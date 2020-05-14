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
    try {
      const context = req.rest
      const result = await routeObject.handler(context, req, res, next)
      if (!res.headersSent) {
        if (result) {
          if (typeof result === "object") {
            return res.json(result)
          }
          return res.send(result)
        }

        if (context.response) {
          if (typeof context.response === "object") {
            return res.json(context.response)
          }
          return res.send(context.response)
        }

        return next()
      }
    } catch (e) {
      next(e)
    }
    return true
  })
}
