const fields = require("./schema/defaultSchemaFields")
const routes = require("./schema/defaultSchemaRoutes")
const pagination = require("./schema/defaultSchemaPagination")

module.exports = {
  fields,
  routes,
  pagination,
  filters: {},
  middleware: {},
  routeKeys: ["_id"],
  hooks: {}
}
