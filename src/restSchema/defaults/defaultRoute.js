const cast = require("../helpers/cast");

module.exports = {
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
    skip: "skip",
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
    $exists: (v, k) => {
      return { $exists: true };
    },
    $notExists: (v, k) => {
      return { $exists: false };
    },
    $null: (v, k) => {
      return null;
    },
    "$regex:": (v, k) => {
      return { $regex: new RegExp(v) };
    },
    "$regexi:": (v, k) => {
      return { $regex: new RegExp(v, "i") };
    }
  }
};
