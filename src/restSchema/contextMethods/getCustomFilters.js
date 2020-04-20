const filter = require("../helpers/filter")
const cast = require("../helpers/cast")

module.exports = async function({ filters = null, route = null, routes = null } = {}) {
  const context = this
  const allFilters = filters || context.schema.filters
  const currentRoute = cast(route).to(String) || context.route
  const allRoutes = routes || Object.values(context.getRoutes()).map(i => i.name)

  // if filters property is function
  if (typeof allFilters === "function") {
    return allFilters(context)
  }

  let globalFilters
  if (allFilters.global) {
    globalFilters =
      typeof allFilters.global === "function" ? await allFilters.global(context) : allFilters.global
  } else {
    globalFilters = {}
  }

  let routeFilters
  if (routeFilters) {
    routeFilters =
      typeof allFilters[route] === "function"
        ? await allFilters[currentRoute](context)
        : allFilters[currentRoute]
  } else {
    routeFilters = {}
  }

  // filters that are not route name and not global
  const directFilters = filter(allFilters, (i, k) => !allRoutes.includes(k) && k !== "global")

  return { ...directFilters, ...globalFilters, ...routeFilters }
}
