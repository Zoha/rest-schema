const { Mixed } = require("../types");
module.exports = {
  type: Mixed,

  // define key in schema
  // will be defined in get fields method
  fieldKey: "",

  // nested options
  isNested: false,
  isArrayNested: false,
  isObjectNested: false,
  children: {},

  // accessors
  creatable: true,
  updatable: true,
  filterable: true,
  hide: false,
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
  required: false,
  min: undefined,
  max: undefined,
  between: undefined,
  minLength: undefined,
  maxLength: undefined,
  betweenLength: undefined,
  match: undefined,
  enum: undefined
};
