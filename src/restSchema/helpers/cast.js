const arrayCast = require("../cast/array")
const BooleanCast = require("../cast/boolean")
const dateCast = require("../cast/date")
const numberCast = require("../cast/number")
const objectCast = require("../cast/object")
const objectIdCast = require("../cast/objectId")
const stringCast = require("../cast/string")
const types = require("../types")

module.exports = (value, type) => {
  const convert = to => {
    if (value === undefined) {
      return undefined
    }
    switch (to) {
      case "Boolean":
      case Boolean:
      case types.Boolean:
        return BooleanCast(value)
      case "Object":
      case Object:
      case types.Object:
        return objectCast(value)
      case "String":
      case String:
      case types.String:
        return stringCast(value)
      case "Number":
      case Number:
      case types.Number:
        return numberCast(value)
      case "Array":
      case Array:
      case types.Array:
        return arrayCast(value)
      case "Date":
      case Date:
      case types.Date:
        return dateCast(value)
      case "ObjectId":
      case types.ObjectId:
        return objectIdCast(value)
      case "ignore":
      case "Mixed":
      case types.Mixed:
      default:
        return value
    }
  }
  if (type) {
    return convert(type)
  }
  return {
    to: convert
  }
}
