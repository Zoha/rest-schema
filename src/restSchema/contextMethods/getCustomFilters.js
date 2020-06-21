const filter = require("../helpers/filter")
const cast = require("../helpers/cast")
const { getRoutes } = require("../schemaFormatters/routeFormatter")

module.exports = async function({
  filters = null,
  route = null,
  routes = null,
  relationFilters = null
} = {}) {
  const context = this
  filters = filters || context.schema.filters
  route = cast(route).to(String) || context.route
  relationFilters = cast(relationFilters).to(Object) || context.relationFilters
  routes =
    (routes && getRoutes(routes, context.schema.defaults)) ||
    Object.values(context.getRoutes()).map(i => i.name)

  // if filters property is function
  if (typeof filters === "function") {
    return filters(context)
  }

  let globalFilters
  if (filters.global) {
    globalFilters =
      typeof filters.global === "function" ? await filters.global(context) : filters.global
  } else {
    globalFilters = {}
  }

  let routeFilters
  if (routeFilters) {
    routeFilters =
      typeof filters[route] === "function" ? await filters[route](context) : filters[route]
  } else {
    routeFilters = {}
  }

  // filters that are not route name and not global
  const directFilters = filter(filters, (i, k) => !routes.includes(k) && k !== "global")

  return { ...directFilters, ...globalFilters, ...routeFilters, ...relationFilters }
}
