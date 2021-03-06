const cloneDeep = require("clone-deep")
const isObject = require("../helpers/isObject")
const isArray = require("../helpers/isArray")
const isFunction = require("../helpers/isFunction")
const isBoolean = require("../helpers/isBoolean")
const filter = require("../helpers/filter")
/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 */

/**
 *
 * @param {fields} fields
 * @param {context} context
 * @returns
 */
const getUpdatableFields = async (fields, context) => {
  if (!fields) {
    return {}
  }
  let result = {}
  if (isArray(fields)) {
    result = []
  }

  const executeLoopOperation = async fieldKey => {
    const field = fields[fieldKey]

    // check field updatable property
    // that specified for this route
    if (isObject(field.updatable) && field.updatable[context.route]) {
      // if updatable was a function
      // and that function returns true
      if (
        isFunction(field.updatable[context.route]) &&
        (await field.updatable[context.route](context))
      ) {
        result[fieldKey] = field
      }
    } else if (isFunction(field.updatable) && (await field.updatable(context))) {
      result[fieldKey] = field
    } else if (isBoolean(field.updatable) && field.updatable !== false) {
      // if updatable is boolean
      // and its value is true
      result[fieldKey] = field
    }

    // if field is nested process children and filter them too
    // but do this just if parent currently is added to fields
    if (result[fieldKey] && field.isNested) {
      if (!field.children && field.isArrayNested) {
        result[fieldKey].children = []
      } else {
        result[fieldKey].children = await getUpdatableFields(field.children, context)
      }
    }
  }

  const operations = []
  // process each field
  const fieldKeys = Object.keys(fields)
  for (let fieldKeyIndex = 0; fieldKeyIndex < fieldKeys.length; fieldKeyIndex += 1) {
    const fieldKey = fieldKeys[fieldKeyIndex]
    operations.push(executeLoopOperation(fieldKey))
  }

  // execute operations
  await Promise.all(operations)

  return filter(result, i => i != null)
}

/**
 * @this context
 * @param {object} [args]
 * @param {fields} [args.fields]
 * @returns {Promise.<fields>}
 */
module.exports = async function({ fields = null } = {}) {
  const context = this
  fields =
    (fields && (await context.getFields({ fields, setFields: false }))) ||
    context.fields ||
    (await context.getFields())
  fields = cloneDeep(fields)
  return getUpdatableFields(fields, context)
}
