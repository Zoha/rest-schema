const filter = require("../helpers/filter");

module.exports = async function() {
  const context = this;
  const filters = context.schema.filters;
  const route = context.route;
  const routes = context.getRoutes().map(i => i.name);

  // if filters property is function
  if (typeof filters == "function") {
    return await filters(context);
  }

  const globalFilters = filters.global
    ? typeof filters.global === "function"
      ? await filters.global(context)
      : filters.global
    : {};

  const routeFilters = filters[route]
    ? typeof filters[route] === "function"
      ? await filters[route](context)
      : filters[route]
    : {};

  // filters that are not route name and not global
  const directFilters = filter(
    filters,
    (i, k) => !routes.includes(k) && k !== "global"
  );

  return { ...directFilters, ...globalFilters, ...routeFilters };
};
