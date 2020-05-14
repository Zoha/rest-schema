const { Mixed } = require("../types")
const relationTypes = require("../enums/relationTypes")
const { singular, plural } = require("pluralize")

module.exports = {
  type: Mixed,

  // define key in schema
  // will be defined in get fields method
  key: "",
  nestedKey: "",
  uniqueKey: "",

  // nested options
  isNested: false,
  isArrayNested: false,
  isObjectNested: false,
  children: {},
  of: Mixed,

  // accessors
  creatable: true,
  updatable: true,
  filterable: true,
  sortable: true,
  hide: false,
  hideByDefault: false,
  set: undefined,
  get: undefined,

  // sanitize
  sanitize: undefined,
  trim: false,
  lowercase: false,
  uppercase: false,
  default: undefined,

  // relation
  ref: undefined,
  refPath: undefined,
  find: (resource, ctx, relationCtx, relation) => {
    const { fieldName, type } = relation
    if (type === relationTypes.resource) {
      return {
        $or: [
          {
            [singular(ctx.schema.name).toLowerCase()]: resource._id
          },
          {
            [plural(ctx.schema.name).toLowerCase()]: resource._id
          },
          {
            _id: resource[fieldName]
          }
        ].filter(i => !!Object.values(i)[0])
      }
    }
    return {
      $or: [
        {
          _id: { $in: resource[fieldName] }
        },
        {
          [plural(ctx.schema.name).toLowerCase()]: resource._id
        },
        {
          [singular(ctx.schema.name).toLowerCase()]: resource._id
        }
      ].filter(i => !!Object.values(i)[0])
    }
  },

  // validations
  validate: undefined,
  unique: false,
  required: false,
  min: undefined,
  max: undefined,
  between: undefined,
  minLength: undefined,
  maxLength: undefined,
  betweenLength: undefined,
  match: undefined,
  enum: undefined
}
