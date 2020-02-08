module.exports = {
  default: {
    name: "default",
    method: "get",
    path: "/",
    resource: false,
    collection: false,
    inputsTarget: ["query", "body"],
    selectable: true,
    meta: {
      select: "select",
      sort: "sort",
      limit: "limit",
      offset: "offset",
      page: "page"
    },
    filteringOperators: {
      "$eq:": (v, k, type) => {
        v = cast(v).to(type);
        return { $eq: v };
      },
      "$gt:": (v, k, type) => {
        v = cast(v).to(type);
        return { $gt: v };
      },
      "$gte:": (v, k, type) => {
        v = cast(v).to(type);
        return { $gte: v };
      },
      "$in:": (v, k, type) => {
        v = v.split(",");
        v = v.map(i => cast(i).to(type));
        return { $in: v };
      },
      "$lt:": (v, k, type) => {
        v = cast(v).to(type);
        return { $lt: v };
      },
      "$lte:": (v, k, type) => {
        v = cast(v).to(type);
        return { $lte: v };
      },
      "$ne:": (v, k, type) => {
        v = cast(v).to(type);
        return { $ne: v };
      },
      "$nin:": (v, k, type) => {
        v = v.split(",");
        v = v.map(i => cast(i).to(type));
        return { $nin: v };
      },
      "$exists:": (v, k) => {
        return { $exists: true };
      },
      "$notExists:": (v, k) => {
        return { $exists: false };
      },
      "$null:": (v, k) => {
        return null;
      },
      "$regex:": (v, k) => {
        return { $regex: new RegExp(v) };
      },
      "$regexi:": (v, k) => {
        return { $regex: new RegExp(v, "i") };
      }
    }
  },
  index: {
    name: "index",
    collection: true,
    handler: require("../routeHandlers/index")
  },
  count: {
    name: "count",
    collection: true,
    handler: require("../routeHandlers/count")
  },
  single: {
    name: "single",
    path: "/:id",
    resource: true,
    handler: require("../routeHandlers/single")
  },
  create: {
    name: "create",
    method: "post",
    path: "/",
    handler: require("../routeHandlers/create")
  },
  update: {
    name: "update",
    method: "put",
    path: "/:id",
    resource: true,
    handler: require("../routeHandlers/update")
  },
  delete: {
    name: "delete",
    method: "delete",
    path: "/:id",
    resource: true,
    handler: require("../routeHandlers/delete")
  }
};
