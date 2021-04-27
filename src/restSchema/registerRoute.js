const injectContext = require("./middleware/injectContext")
const registerMiddlewareList = require("./middleware/registerMiddlewareList")
const beforeHook = require("./middleware/beforeHook")
const afterMiddlewareHook = require("./middleware/afterMiddlewareHook")

module.exports = (router, routeObject, schema) => {
  // register middleware
  // some of middleware are with condition
  // and will be injected if route need them

  // inject context to request
  const middlewareList = [injectContext(schema, routeObject), beforeHook]

  // inject middleware list
  // @ts-ignore
  middlewareList.push(registerMiddlewareList(schema, routeObject))

  // for calling afterMiddleware hook
  middlewareList.push(afterMiddlewareHook)

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
            await context.hook("after")
            return
          }

          // if wrapper returns response
          if (wrapperResponse) {
            if (typeof wrapperResponse === "object") {
              await context.hook("after")
              return res.json(wrapperResponse)
            }
            await context.hook("after")
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
          await context.hook("error")
          return
        }

        // if wrapper returns response
        if (wrapperResponse) {
          if (typeof wrapperResponse === "object") {
            await context.hook("error")
            return res.json(wrapperResponse)
          }
          await context.hook("error")
          return res.send(wrapperResponse)
        }
      }
      await context.hook("error")
      return next(err)
    }
  })
}
