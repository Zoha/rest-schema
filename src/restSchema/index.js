const deepmerge = require("deepmerge");
const registerRoute = require("./registerRoute");
const modelFormatter = require("./schemaFormatters/modelFormatter");
const defaults = require("./defaults/defaultSchema");

module.exports = schema => {
  // merge defaults and passed
  const schema = deepmerge([defaults, schema]);
  // format schema model
  schema.model = modelFormatter(schema.model);
  // create express router
  const router = require("express").Router();
  // register routes
  for (route of schema.routes) {
    registerRoute(router, route, schema);
  }
  return router;
};
