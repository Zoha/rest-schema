const ObjectId = require("mongoose").Schema.Types.ObjectId;

module.exports = {
  fields: require("./schema/defaultSchemaFields"),
  routes: require("./schema/defaultSchemaRoutes"),
  pagination: require("./schema/defaultSchemaPagination"),
  filters: {},
  middleware: {},
  routeKeys: ["_id"],
  hooks: {}
};
