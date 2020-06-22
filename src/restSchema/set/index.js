const setDefaultField = require("./setDefaultField")
const setDefaultMessages = require("./setDefaultMessages")
const setDefaultValidationMessages = setDefaultMessages.setDefaultValidationMessages
const setDefaultRoute = require("./setDefaultRoute")
const setDefaultRouteMeta = setDefaultRoute.setDefaultRouteMeta
const setDefaultRouteFilteringOperators = setDefaultRoute.setDefaultRouteFilteringOperators
const setDefaultSchema = require("./setDefaultSchema")
const setDefaultSchemaFields = setDefaultSchema.setDefaultSchemaFields
const setDefaultSchemaPagination = setDefaultSchema.setDefaultSchemaPagination
const setDefaultSchemaRoutes = setDefaultSchema.setDefaultSchemaRoutes
const setDefaultSchemaWrappers = setDefaultSchema.setDefaultSchemaWrappers
const addHook = require("./addHook")
const addMiddleware = require("./addMiddleware")

module.exports = {
  setDefaultField,
  setDefaultMessages,
  setDefaultValidationMessages,
  setDefaultRoute,
  setDefaultRouteMeta,
  setDefaultRouteFilteringOperators,
  setDefaultSchema,
  setDefaultSchemaFields,
  setDefaultSchemaPagination,
  setDefaultSchemaRoutes,
  setDefaultSchemaWrappers,
  addHook,
  addMiddleware
}
