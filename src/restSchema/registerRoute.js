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
          // apply wrapper
          const wrapperResponse = context.schema.wrappers.response(response, req, res, next)

          if (res.headersSent) {
            return
          }

          // if wrapper returns response
          if (wrapperResponse) {
            if (typeof wrapperResponse === "object") {
              return res.json(wrapperResponse)
            }
            return res.send(wrapperResponse)
          }
        }
        return next()
      }
    } catch (err) {
      if (!res.headersSent) {
        // apply error response
        const wrapperResponse = context.schema.wrappers.error(err, context, req, res, next)

        if (res.headersSent) {
          return
        }

        // if wrapper returns response
        if (wrapperResponse) {
          if (typeof wrapperResponse === "object") {
            return res.json(wrapperResponse)
          }
          return res.send(wrapperResponse)
        }
      }
      return next(err)
    }
  })
}
