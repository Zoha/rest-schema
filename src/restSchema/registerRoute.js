const routeFormatter = require("./schemaFormatters/routeFormatter");
const createContext = require("./createContext");
const injectContext = require("./middleware/injectContext");
const registerMiddlewareList = require("./middleware/registerMiddlewareList");

module.exports = (router, route, schema) => {
  // convert route to proper format using route formatter
  const routeObject = routeFormatter.getRoute(route);

  // create base context
  const context = createContext(schema, routeObject);

  // register middleware
  // some of middleware are with condition
  // and will be injected if route need them

  // inject context to request
  const middlewareList = [injectContext(context)];

  // inject middleware list
  middlewareList.push(registerMiddlewareList());

  // registering the route
  router[routeObject.method](
    routeObject.path,
    middlewareList,
    async (req, res, next) => {
      try {
        const result = await routeObject.handler(context);

        if (!res.headersSent) {
          if (result) {
            if (typeof result == "object") {
              return res.json(result);
            } else {
              return res.send(result);
            }
          }

          if (context.response) {
            if (typeof context.response == "object") {
              return res.json(context.response);
            } else {
              return res.send(context.response);
            }
          }

          return next();
        }
      } catch (e) {
        next(e);
      }
    }
  );
};
