const cast = require("../helpers/cast")

module.exports = {
  // basic info of route
  name: "default",
  method: "get",
  path: "/",
  inputsTarget: ["query", "body"],
  selectable: true,
  filterable: true,

  // middleware
  middleware: [],

  // meta that contains key props for this route
  meta: {
    select: "select",
    sort: "sort",
    limit: "limit",
    skip: "skip",
    page: "page"
  },

  // default route handler
  handler: async context => {
    const messages = await context.getMessages()
    return { message: messages.inactiveRouteMessage }
  },

  // custom operators fro filtering data
  // this operators will be applied in getFilters method
  filteringOperators: {
    $eq: (v, k, type) => {
      const value = cast(v).to(type)
      return { $eq: value }
    },
    $gt: (v, k, type) => {
      const value = cast(v).to(type)
      return { $gt: value }
    },
    $gte: (v, k, type) => {
      const value = cast(v).to(type)
      return { $gte: value }
    },
    $in: (v, k, type) => {
      let value = v.split(",")
      value = value.map(i => cast(i).to(type))
      return { $in: value }
    },
    $lt: (v, k, type) => {
      const value = cast(v).to(type)
      return { $lt: value }
    },
    $lte: (v, k, type) => {
      const value = cast(v).to(type)
      return { $lte: value }
    },
    $ne: (v, k, type) => {
      const value = cast(v).to(type)
      return { $ne: value }
    },
    $nin: (v, k, type) => {
      let value = v.split(",")
      value = value.map(i => cast(i).to(type))
      return { $nin: value }
    },
    $exists: () => {
      return { $exists: true }
    },
    $notExists: () => {
      return { $exists: false }
    },
    $null: () => {
      return null
    },
    $notNull: () => {
      return { $ne: null }
    },
    $regex: v => {
      return { $regex: new RegExp(v) }
    },
    $regexi: v => {
      return { $regex: new RegExp(v, "i") }
    }
  }
}
