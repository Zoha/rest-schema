const routeFormatter = require("./schemaFormatters/routeFormatter");
const createContext = require("./createContext");
const injectContext = require("./middleware/injectContext");
const injectResource = require("./middleware/injectResource");
const injectCollection = require("./middleware/injectCollection");
const registerMiddlewareList = require("./middleware/registerMiddlewareList");

module.exports = (router, route, schema) => {
  // convert route to proper format using route formatter
  const route = routeFormatter.getRoute(route);

  // create base context
  const context = createContext(schema, route);

  // register middleware
  // some of middleware are with condition
  // and will be injected if route need them

  // inject context to request
  const middlewareList = [injectContext(context)];

  // inject resource
  if (route.resource) {
    middlewareList.push(injectResource);
  }

  // inject resources collection
  if (route.collection) {
    middlewareList.push(injectCollection);
  }

  // inject middleware list
  middlewareList.push(registerMiddlewareList());

  // registering the route
  router[route.method](route.path, middlewareList, (req, res, next) => {
    try {
        const result = await routeHandler(context);
        if (result && !res.headersSent){
            return res.json(result);
        }
        return next();
    } catch (e) {
      next(e);
    }
  });
};
