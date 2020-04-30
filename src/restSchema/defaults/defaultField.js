const { Mixed } = require("../types")

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
