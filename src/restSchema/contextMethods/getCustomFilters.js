const filter = require("../helpers/filter")

module.exports = async function() {
  const context = this
  const { filters } = context.schema
  const { route } = context
  const routes = Object.values(context.getRoutes()).map(i => i.name)

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

  return { ...directFilters, ...globalFilters, ...routeFilters }
}
