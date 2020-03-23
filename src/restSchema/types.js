const { ObjectId, Mixed } = require("mongoose").Schema.Types

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
