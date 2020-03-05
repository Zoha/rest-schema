const defaultRoutes = require("../defaults/schema/defaultSchemaRoutes");
const defaultRoute = require("../defaults/defaultRoute");

const getRoute = route => {
  if (typeof route == "object") {
    let defaultValues = {};
    if (route.name) {
      defaultValues = defaultRoutes[route.name];
    }
    return { ...defaultRoute, ...defaultValues, ...route };
  } else if (typeof route === "string" && defaultRoutes[route]) {
    return defaultRoutes[route];
  }
  throw new Error("route name not exists");
};

const getRoutes = routes => {
  let optionRoutes = [];
  for (let route of Object.values(routes)) {
    optionRoutes.push(getRoute(route));
  }
  return optionRoutes;
};

module.exports = {
  getRoute,
  getRoutes
};
