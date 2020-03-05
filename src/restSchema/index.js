const registerRoute = require("./registerRoute");
const schemaFormatter = require("./schemaFormatters/schemaFormatter");

module.exports.resource = userSchema => {
  // format schema and merge it with default
  const schema = schemaFormatter(userSchema);
  // create express router
  const router = require("express").Router();
  // register routes
  for (route of schema.routes) {
    registerRoute(router, route, schema);
  }
  return router;
};
