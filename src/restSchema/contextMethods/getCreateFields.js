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
 * @param {fields} fields
 * @param {context} context
 * @returns {Promise<fields>}
 */
const getCreatableFields = async (fields, context) => {
  if (!fields) {
    return {}
  }
  let result = {}
  if (isArray(fields)) {
    result = []
  }

  const executeLoopOperation = async fieldKey => {
    const field = fields[fieldKey]
    // check field creatable property
    // that specified for this route
    if (isObject(field.creatable) && field.creatable[context.route]) {
      // if creatable was a function
      // and that function returns true
      if (
        isFunction(field.creatable[context.route]) &&
        (await field.creatable[context.route](context))
      ) {
        result[fieldKey] = field
      }
      // @ts-ignore
    } else if (isFunction(field.creatable) && (await field.creatable(context))) {
      result[fieldKey] = field
    } else if (isBoolean(field.creatable) && field.creatable !== false) {
      // if creatable is boolean
      // and its value is true
      result[fieldKey] = field
    } else if (field.default) {
      result[fieldKey] = {
        ...field,
        set: field.default
      }
    }

    // if field is nested process children and filter them too
    // but do this just if parent currently is added to fields
    if (result[fieldKey] && field.isNested) {
      if (!field.children && field.isArrayNested) {
        result[fieldKey].children = []
      } else {
        result[fieldKey].children = await getCreatableFields(field.children, context)
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
  const clonedFields = cloneDeep(fields)
  return getCreatableFields(clonedFields, context)
}
