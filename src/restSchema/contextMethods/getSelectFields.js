const cloneDeep = require("clone-deep")
const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")
const isFunction = require("../helpers/isFunction")
const filter = require("../helpers/filter")
const addToFieldsArrayAsLengthOfValues = require("../helpers/addToFieldsArrayAsLengthOfInputs")
const cast = require("../helpers/cast")
const createMapFieldsFromInput = require("../helpers/createMapFieldsFromInput")

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
 * @typedef {import("../../../typeDefs/field").field} field
 */

/**
 * @typedef {import("./getRelations").relationObj} relationObj
 */

/**
 *
 * @param {fields} argFields
 * @param {object|array} values
 * @param {context} context
 * @param {selectFieldBase} selectFields
 * @param {resource} originalResource
 * @param {relationObj[]} [loadRelations]
 * @param {field} [parent]
 * @param {Object.<string, fields>} [relationsFields]
 * @returns
 */
const getFields = async (
  argFields,
  values,
  context,
  selectFields,
  originalResource,
  loadRelations,
  parent = null
) => {
  if (!argFields) {
    return isArray(values) ? [] : {}
  }
  // define object for final results
  let result = {}
  // if target should be array
  if (isArray(argFields)) {
    result = []
  }

  // if type of fields are array
  // and count of fields are lower that values
  // add fields item to equal length of the values
  const fields = addToFieldsArrayAsLengthOfValues(argFields, values)

  const executeLoopOperation = async fieldKey => {
    // define field and value
    let field = fields[fieldKey]
    let value = context.cast(values[fieldKey]).to(field.type || String)
    let include = selectFields.showChildrenByDefault

    const fieldInRelations = loadRelations.find(r => r.field.uniqueKey === field.uniqueKey)
    let isRelation = false
    if (fieldInRelations) {
      field = cloneDeep(fieldInRelations.field)
      isRelation = true
      field.isNested = true
      field.isObjectNested = true
      field.type = Object
      field.default = () => ({})
      field.children = await fieldInRelations.schemaBuilder.tempContext.getFields()
      value = context.cast(values[fieldKey]).to(field.type || String)
    }

    if (field == null) {
      return
    }

    // if fields should be hided
    // so this fields should not be selected
    let { hide } = field
    if (isObject(field.hide)) {
      hide = field.hide[context.route]
    }
    if (hide) {
      if (isFunction(hide)) {
        if (
          await hide({
            ...context,
            resource: originalResource
          })
        ) {
          return
        }
      } else {
        return
      }
    }

    // check for hide by default
    let schemaHideByDefault = field.hideByDefault
    if (isObject(field.hideByDefault)) {
      schemaHideByDefault = field.hideByDefault[context.route]
    }
    if (schemaHideByDefault) {
      if (isFunction(schemaHideByDefault)) {
        if (
          await schemaHideByDefault({
            ...context,
            resource: originalResource
          })
        ) {
          include = false
        }
      } else {
        include = false
      }
    }

    // check that exists in selected
    // if yes so check that selected should be hide or not
    let targetNestedKey = field.nestedKey
    if (parent) {
      targetNestedKey = parent.nestedKey + "." + field.nestedKey
    }
    let targetNestedKeyWithoutArrayIndexes = targetNestedKey.replace(/\.\d+(\.|$)/g, "$1")
    let thisFieldInSelectFields = selectFields.children.find(i => {
      return (
        i.key === targetNestedKey ||
        (targetNestedKey !== targetNestedKeyWithoutArrayIndexes &&
          !/\.\d+$/.test(i.key) &&
          i.key.startsWith(targetNestedKeyWithoutArrayIndexes))
      )
    })

    if (
      thisFieldInSelectFields &&
      targetNestedKey !== targetNestedKeyWithoutArrayIndexes &&
      thisFieldInSelectFields.key.length > targetNestedKeyWithoutArrayIndexes.length &&
      !/\.\d+$/.test(thisFieldInSelectFields.key) &&
      thisFieldInSelectFields.key.startsWith(targetNestedKeyWithoutArrayIndexes)
    ) {
      thisFieldInSelectFields = {
        key: targetNestedKey,
        children: [thisFieldInSelectFields],
        show: true,
        showChildrenByDefault: thisFieldInSelectFields.showChildrenByDefault
      }
    }

    if (thisFieldInSelectFields) {
      if (!thisFieldInSelectFields.show) {
        return
      }
      include = true
    }

    // if value have no value (undefined or null)
    // and field has a default property
    // get the default value for
    if (value == null && field.default != null) {
      let defaultValue = field.default
      if (isObject(defaultValue)) {
        defaultValue = field.default[context.route]
      }
      if (defaultValue != null) {
        if (isFunction(defaultValue)) {
          value = await defaultValue({
            ...context,
            resource: originalResource
          })
        } else {
          value = defaultValue
        }
      }
    }

    // if value have a get
    // or is an object that has get
    // then get value by the get function or get value
    if (field.get) {
      let { get } = field
      if (isObject(get)) {
        get = field.get[context.route]
      }
      if (get) {
        if (isFunction(get) && (value != null || (!field.creatable && !field.updatable))) {
          value = await get(value, {
            ...context,
            resource: originalResource
          })
        } else if (!isFunction(get)) {
          value = get
        }
      }
    }

    // process map type
    if (field.type === Map && field.of) {
      field.type = Object
      field.isNested = true
      field.isObjectNested = true
      field.children = createMapFieldsFromInput(field.of, value)
    }

    // if value was get and not equals to null or undefined
    // process the nested values for the field
    if (
      value != null &&
      field.isNested &&
      (isObject(value) || isArray(value)) &&
      thisFieldInSelectFields
    ) {
      field.children = await getFields(
        field.children,
        value,
        context,
        thisFieldInSelectFields,
        originalResource,
        loadRelations,
        isRelation ? field : null
      )

      if (Object.values(field.children).length) {
        include = true
      }
    }

    if (include) {
      // add to final result
      result[fieldKey] = field
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
 * @typedef {object} selectFieldBase
 * @property {boolean} showChildrenByDefault
 * @property {boolean} show
 * @property {selectFieldBase[]} children
 * @property {string} key
 */
/**
 * @param {string} key
 * @param {string[]} keys
 * @param {selectFieldBase} base
 * @returns {selectFieldBase}
 */
const packInputs = (
  key,
  keys,
  base = { show: true, showChildrenByDefault: true, children: [], key: null }
) => {
  let show = !key.startsWith("-")
  const originalKey = key
  key = key.replace(/^[-+]/, "")
  const exactKey = keys.find(i => i.replace(/^[-+]/, "") === key)
  if (exactKey) {
    if (exactKey.startsWith("-")) {
      show = false
    } else if (!exactKey.startsWith("+")) {
      base.showChildrenByDefault = false
    }
    return {
      showChildrenByDefault: show,
      show,
      children: [],
      key
    }
  } else if (!key || keys.filter(i => i.includes(key)).length) {
    const childrenKeys = key ? keys.filter(i => i.replace(/^[-+]/, "").startsWith(key + ".")) : keys

    const final = {
      showChildrenByDefault: true,
      show: true,
      children: [],
      key
    }
    final.children = childrenKeys
      .map(i => i.substr(originalKey.length))
      .map(i => /^\.?([^.]+)/.exec(i))
      .filter(i => !!i && isArray(i) && i.length)
      .map(i => i[1])
      .map(childKey =>
        packInputs(originalKey ? `${originalKey}.` + childKey : childKey, childrenKeys, final)
      )
    return final
  }
}

/**
 *
 * @param {object} args
 * @param {object} args.inputs
 * @param {string} args.selectInputKey
 * @returns {selectFieldBase}
 */
const getSelectPacks = ({ inputs, selectInputKey }) => {
  // get all fields that are specified in the inputs.selectKey
  // return array of select fields in format of like
  // { fields : object , shouldBeHided : boolean}
  const selectInput = inputs[selectInputKey]
  if (!selectInput) {
    return {
      key: "",
      showChildrenByDefault: true,
      show: true,
      children: []
    }
  }

  let arrayOfSelectInput = []
  if (typeof selectInput === "object") {
    arrayOfSelectInput = selectInput
  } else if (typeof selectInput === "string") {
    arrayOfSelectInput = selectInput.split(" ")
  }

  return packInputs("", arrayOfSelectInput)
}

/**
 * @this context
 * @param {object} [args]
 * @param {resource} [args.resource]
 * @param {fields} [args.fields]
 * @param {string} [args.selectInputKey]
 * @param {object} [args.inputs]
 * @param {import("../../../typeDefs/route").route} [args.routeObject]
 * @param {boolean} [args.selectable]
 * @param {relationObj[]} [args.loadRelations]
 * @returns {Promise.<fields>}
 */
module.exports = async function({
  resource = null,
  fields = null,
  selectInputKey = null,
  inputs = null,
  routeObject = null,
  selectable = null,
  loadRelations = null
} = {}) {
  const context = this
  fields =
    (fields && (await context.getFields({ fields, setFields: false }))) ||
    context.fields ||
    (await context.getFields())
  fields = cloneDeep(fields)
  inputs = cast(inputs).to(Object) || context.inputs || (await context.getInputs())
  selectInputKey = cast(selectInputKey).to(String) || context.routeObject.meta.select || "select"
  resource = cast(resource).to(Object) || context.resource || (await context.getResource())
  routeObject = cast(routeObject).to(Object) || context.routeObject
  selectable = cast(selectable).to(Boolean) || routeObject.selectable
  loadRelations = cast(loadRelations).to(Array) || (await context.getRelations())

  // get fields that are specified in select input
  // this values can be for hiding the field
  // or display it
  let selectFields = await getSelectPacks({
    inputs: inputs,
    selectInputKey: selectInputKey
  })

  // if select fields is false
  // or route object is not selectable
  // so selectFields should be empty
  if (!selectFields || !selectable) {
    selectFields = { show: false, showChildrenByDefault: false, children: [], key: null }
  }

  // if selectable fields has any item without -
  // so hide by default should be true

  return getFields(fields, resource, context, selectFields, resource, loadRelations, null)
}
