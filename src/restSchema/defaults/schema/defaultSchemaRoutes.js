module.exports = {
  index: {
    name: "index",
    collection: true,
    handler: require("../../routeHandlers/index")
  },
  count: {
    name: "count",
    collection: true,
    handler: require("../../routeHandlers/count")
  },
  single: {
    name: "single",
    path: "/:id",
    resource: true,
    handler: require("../../routeHandlers/single")
  },
  create: {
    name: "create",
    method: "post",
    path: "/",
    handler: require("../../routeHandlers/create")
  },
  update: {
    name: "update",
    method: "put",
    path: "/:id",
    resource: true,
    handler: require("../../routeHandlers/update")
  },
  delete: {
    name: "delete",
    method: "delete",
    path: "/:id",
    resource: true,
    handler: require("../../routeHandlers/delete")
  }
};
