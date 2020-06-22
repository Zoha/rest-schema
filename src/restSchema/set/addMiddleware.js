const { defaultPluginMiddlewareList } = require("../defaults")

module.exports = (route, middleware, { target = defaultPluginMiddlewareList } = {}) => {
  if (typeof route !== "string" || typeof middleware !== "function") {
    return
  }

  if (!target[route]) {
    target[route] = []
  }

  target[route].push(middleware)
}
