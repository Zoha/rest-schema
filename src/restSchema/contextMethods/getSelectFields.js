const cloneDeep = require("clone-deep")
const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")
const isFunction = require("../helpers/isFunction")
const filter = require("../helpers/filter")
const addToFieldsArrayAsLengthOfValues = require("../helpers/addToFieldsArrayAsLengthOfInputs")

const getFields = async (argFields, values, context, selectFields, hideByDefault = false) => {
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
    const field = fields[fieldKey]
    let value = context.cast(values[fieldKey]).to(field.type || String)
    let include = !hideByDefault

    // if fields should be hided
    // so this fields should not be selected
    let { hide } = field
    if (isObject(field.hide)) {
      hide = field.hide[context.route]
    }
    if (hide) {
      if (isFunction(hide)) {
        if (await hide(context)) {
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
        if (await schemaHideByDefault(context)) {
          include = false
        }
      } else {
        include = false
      }
    }

    // check that exists in selected
    // if yes so check that selected should be hide or not
    const thisFieldInSelectFields = selectFields.filter(
      i => i.field.uniqueKey === field.uniqueKey
    )[0]

    if (thisFieldInSelectFields) {
      if (thisFieldInSelectFields.shouldBeHided === true) {
        return
      }
      include = true
    }

    // if value have no value (undefined or null)
    // and field has a default property
    // get the default value for
    if (value == null && field.default) {
      if (field.default) {
        let defaultValue = field.default
        if (isObject(defaultValue)) {
          defaultValue = field.default[context.route]
        }
        if (defaultValue) {
          if (isFunction(defaultValue)) {
            value = await defaultValue(context)
          } else {
            value = defaultValue
          }
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
        if (isFunction(get) && value != null) {
          value = await get(value, context)
        } else if (!isFunction(get)) {
          value = get
        }
      }
    }

    // if value was get and not equals to null or undefined
    // process the nested values for the field
    if (value != null && field.isNested && (isObject(value) || isArray(value))) {
      field.children = await getFields(field.children, value, context, selectFields, hideByDefault)

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

const getSelectFields = async ({ inputs, selectInputKey, context }) => {
  // get all fields that are specified in the inputs.selectKey
  // return array of select fields in format of like
  // { fields : object , shouldBeHided : boolean}
  const selectInput = inputs[selectInputKey]
  if (!selectInput) {
    return false
  }

  let arrayOfSelectInput = []
  if (typeof selectInput === "object") {
    arrayOfSelectInput = selectInput
  } else if (typeof selectInput === "string") {
    arrayOfSelectInput = selectInput.split(" ")
  }

  const selectFields = []

  Object.keys(arrayOfSelectInput).forEach(fieldKeyIndex => {
    let fieldKey = arrayOfSelectInput[fieldKeyIndex]
    let shouldBeHided = false
    if (typeof fieldKey === "string") {
      shouldBeHided = fieldKey.startsWith("-")
      fieldKey = fieldKey.replace(/^[-+]?/, "")
    } else {
      shouldBeHided = fieldKey === 1
      fieldKey = fieldKeyIndex
    }
    selectFields.push(
      context.getNestedField(fieldKey).then(field => {
        return {
          field,
          shouldBeHided
        }
      })
    )
  })
  return Promise.all(selectFields)
}

module.exports = async function({
  resource = null,
  fields = null,
  selectInputKey = null,
  inputs = null,
  routeObject = null,
  selectable = null
} = {}) {
  const context = this
  let targetFields =
    (fields && (await context.getFields({ fields }))) ||
    context.fields ||
    (await context.getFields())
  targetFields = cloneDeep(targetFields)
  const targetInputs = inputs || context.inputs || (await context.getInputs())
  const targetSelectFieldKey = selectInputKey || context.routeObject.meta.select || "select"
  const targetResource = resource || context.resource || (await context.getResource())
  const targetRouteObject = routeObject || context.routeObject
  const isSelectable = selectable || targetRouteObject.selectable

  // get fields that are specified in select input
  // this values can be for hiding the field
  // or display it
  let selectFields = await getSelectFields({
    inputs: targetInputs,
    selectInputKey: targetSelectFieldKey,
    context
  })

  // if select fields is false
  // or route object is not selectable
  // so selectFields should be empty
  if (selectFields === false || !isSelectable) {
    selectFields = []
  }

  // if selectable fields has any item without -
  // so hide by default should be true
  const hideByDefault = !!selectFields.filter(i => i.shouldBeHided === false).length

  return getFields(targetFields, targetResource, context, selectFields, hideByDefault)
}
