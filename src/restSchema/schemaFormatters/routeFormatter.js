const { InvalidArgumentError } = require("../errors")
const defaults = require("../defaults")

const getRoute = (route, customDefaults) => {
  if (!customDefaults) {
    customDefaults = defaults
  }
  const defaultRoutes = customDefaults.defaultSchema.routes
  const defaultRoute = customDefaults.defaultRoute
  if (typeof route == "object") {
    let defaultValues = {}
    if (route.name) {
      defaultValues = defaultRoutes[route.name]
    }
    return { ...defaultRoute, ...defaultValues, ...route }
  } else if (typeof route === "string" && defaultRoutes[route]) {
    return defaultRoutes[route]
  }

  throw new InvalidArgumentError("route name not exists")
}

const getRoutes = (routes, defaults) => {
  let optionRoutes = []
  for (let route of Object.values(routes)) {
    optionRoutes.push(getRoute(route, defaults))
  }
  return optionRoutes
}

module.exports = {
  getRoute,
  getRoutes
}
