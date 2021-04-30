const mongoose = require("mongoose")
const { ObjectId: MongooseSchemaObjectId } = mongoose.Schema.Types
const { ObjectId } = mongoose.Types

const RestSchemaObjectId = function(val) {
  if (val) {
    return ObjectId(val)
  }
  return ObjectId()
}
RestSchemaObjectId.isValid = ObjectId.isValid
RestSchemaObjectId.createFromHexString = ObjectId.createFromHexString
RestSchemaObjectId.createFromTime = ObjectId.createFromTime
RestSchemaObjectId.generate = ObjectId.generate
RestSchemaObjectId.cacheHexString = ObjectId.cacheHexString

RestSchemaObjectId.prototype = Object.create(MongooseSchemaObjectId.prototype)

module.exports = RestSchemaObjectId
