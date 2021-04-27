const createContext = require("../createContext")

/**
 *
 * @param {import("../../../typeDefs/schema").schema} schema
 * @param {import("../../../typeDefs/route").route} routeObject
 * @returns
 */
module.exports = (schema, routeObject) => {
  return (req, res, next) => {
    try {
      // create base context
      const context = createContext(schema, routeObject)
      req.rest = context
      context.req = req
      context.res = res
      next()
    } catch (e) {
      next(e)
    }
  }
}
