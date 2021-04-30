const fields = require("./schema/defaultSchemaFields")
const routes = require("./schema/defaultSchemaRoutes")
const pagination = require("./schema/defaultSchemaPagination")
const wrappers = require("./schema/defaultSchemaWrappers")

module.exports = {
  fields,
  routes,
  pagination,
  wrappers,
  filters: {},
  middleware: {},
  routeKeys: ["_id"],
  hooks: {},
  saveNullInputsInDatabase: true,
  returnNullValuesInResponse: false,
  maximumRelationDepth: 4,
  errorOnInvalidLimit: true
}
