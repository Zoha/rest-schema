const ObjectId = require("mongoose").Schema.Types.ObjectId;

module.exports = {
  fields: {
    _id: {
      type: ObjectId,
      creatable: false,
      updatable: false
    },
    id: {
      type: Number,
      creatable: false,
      updatable: false
    }
  },
  routes: ["index", "create", "delete", "update", "single", "count"],
  paginationMeta: {
    defaultFilters: {},
    sort: "-createdAt",
    offset: 0,
    limit: 10,
    minLimit: 1,
    maxLimit: 50
  },
  filters: {},
  middleware: {},
  routeKeys: ["id", "_id"],
  hooks: {}
};
