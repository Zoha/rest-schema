const defaults = require("./defaults")
const cloneDeep = require("clone-deep")

const methods = {
  cast: require("./contextMethods/cast"),
  createResource: require("./contextMethods/createResource"),
  deleteResource: require("./contextMethods/deleteResource"),
  findLocationOfInput: require("./contextMethods/findLocationOfInput"),
  getAggregateCollection: require("./contextMethods/getAggregateCollection"),
  getAggregateResource: require("./contextMethods/getAggregateResource"),
  getCollection: require("./contextMethods/getCollection"),
  getCreateFields: require("./contextMethods/getCreateFields"),
  getCreateInputs: require("./contextMethods/getCreateInputs"),
  getCustomFilters: require("./contextMethods/getCustomFilters"),
  getFields: require("./contextMethods/getFields"),
  getFilters: require("./contextMethods/getFilters"),
  getInputs: require("./contextMethods/getInputs"),
  getInputsFromFields: require("./contextMethods/getInputsFromFields"),
  getLimit: require("./contextMethods/getLimit"),
  getLoadRelations: require("./contextMethods/getLoadRelations"),
  getMessages: require("./contextMethods/getMessages"),
  getNestedField: require("./contextMethods/getNestedField"),
  getNestedInput: require("./contextMethods/getNestedInput"),
  getPage: require("./contextMethods/getPage"),
  getPaginationData: require("./contextMethods/getPaginationData"),
  getRelations: require("./contextMethods/getRelations"),
  getResource: require("./contextMethods/getResource"),
  getResourceResponse: require("./contextMethods/getResourceResponse"),
  getResponseValuesFromResource: require("./contextMethods/getResponseValuesFromResource"),
  getRouteKeys: require("./contextMethods/getRouteKeys"),
  getRouteKeysFilters: require("./contextMethods/getRouteKeysFilters"),
  getRoutes: require("./contextMethods/getRoutes"),
  getSearch: require("./contextMethods/getSearch"),
  getSelectFields: require("./contextMethods/getSelectFields"),
  getSkip: require("./contextMethods/getSkip"),
  getSort: require("./contextMethods/getSort"),
  getTotal: require("./contextMethods/getTotal"),
  getUpdateFields: require("./contextMethods/getUpdateFields"),
  getUpdateInputs: require("./contextMethods/getUpdateInputs"),
  hook: require("./contextMethods/hook"),
  sanitizeInput: require("./contextMethods/sanitizeInput"),
  sanitizeInputs: require("./contextMethods/sanitizeInputs"),
  setMeta: require("./contextMethods/setMeta"),
  setPaginationHeaders: require("./contextMethods/setPaginationHeaders"),
  updateResource: require("./contextMethods/updateResource"),
  validateInput: require("./contextMethods/validateInput"),
  validateInputs: require("./contextMethods/validateInputs"),
  getCollectionResponse: require("./contextMethods/getCollectionResponse"),
  getDirtyInputs: require("./contextMethods/getDirtyInputs")
}

/**
 *
 * @param {import("../../typeDefs/schema").schema} schema
 * @param {import("../../typeDefs/route").route} route
 * @returns {import("../../typeDefs/context").context}
 */
module.exports = (schema, route) => {
  return {
    schema,
    model: schema.model,
    route: route.name,
    routeObject: route,
    defaults: schema.defaults || cloneDeep(defaults),
    relationFilters: {},
    ...methods
  }
}

module.exports.contextMethods = methods
