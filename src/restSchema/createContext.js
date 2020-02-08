module.exports = (schema, route) => {
  return {
    schema,
    route: route.name,
    routeObject: route,
    hook: require("./contextMethods/hook"),
    createResource: require("./contextMethods/createResource"),
    getCollection: require("./contextMethods/getCollection"),
    getResource: require("./contextMethods/getResource"),
    setPaginationHeaders: require("./contextMethods/setPaginationHeaders"),
    resourceResponse: require("./contextMethods/resourceResponse"),
    resourcesResponse: require("./contextMethods/resourcesResponse"),
    sanitizeFields: require("./contextMethods/sanitizeFields"),
    sanitizeField: require("./contextMethods/sanitizeFields"),
    updateResource: require("./contextMethods/updateResource"),
    validateFields: require("./contextMethods/validateFields"),
    validateField: require("./contextMethods/validateFields")
  };
};
