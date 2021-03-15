const { Mixed } = require("mongoose").Schema.Types
const ObjectId = require("./CustomObjectId")

module.exports = Object.freeze({
  String: String,
  Number: Number,
  Object: Object,
  Array: Array,
  Boolean: Boolean,
  Buffer: Buffer,
  Date: Date,
  Map: Map,
  Mixed,
  ObjectId
})
