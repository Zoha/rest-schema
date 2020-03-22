const filter = require("../helpers/filter")
const isObject = require("../helpers/isObject")
const isArray = require("../helpers/isArray")

module.exports = async function() {
  const context = this
  const inputs = context.inputs || (await context.getInputs())
  const operators = context.routeObject.filteringOperators
  const { defaultFilters } = context.schema.pagination
  const customFilters = await context.getCustomFilters()

  const formatFilters = async (key, argValue) => {
    let logic
    let filterValue

    // if type of field not found return undefined
    const field = await context.getNestedField(key)
    if (field == null || !field.filterable || field.type == null) {
      return undefined
    }
    const { type } = field

    // convert value to string and url decode it
    const value = decodeURIComponent(context.cast(argValue).to(String))

    if (value == null) {
      return undefined
    }

    // change hasOperator if string
    // starts with an operator
    let hasOperator
    Object.keys(operators).every(operator => {
      if (!hasOperator && value.startsWith(operator)) {
        hasOperator = true
        return false
      }
      return true
    })

    // if string has operator
    // split each operator sentence
    // and push its filter that returned from
    // handler to the filterValue
    if (hasOperator) {
      const regex = new RegExp(
        `(${Object.keys(operators)
          .map(i => i.replace(":", "").replace("$", "\\$"))
          .join("|")})`,
        "g"
      )
      let operatorSections = value
        .replace(regex, "{$SP$}$1")
        .split("{$SP$}")
        .slice(1)

      if (operatorSections.length > 1) {
        filterValue = []

        logic = operatorSections[0].endsWith("|") ? "$or" : "$and"

        operatorSections = operatorSections.map(i => i.replace(/[|,]?$/, ""))

        if (logic === "$or") {
          operatorSections = operatorSections.map(i => i.replace(/\]$/, ""))
        }
      }

      // get value and the operator in each operator section
      // and call its handler to get the value
      Object.values(operatorSections).forEach(section => {
        const result = /(\$[^:]+:?)(.*)/.exec(section)
        const [, sectionOperator, sectionValue] = result
        if (operators[sectionOperator]) {
          if (logic) {
            filterValue.push(operators[sectionOperator](sectionValue, key, type))
          } else {
            filterValue = operators[sectionOperator](sectionValue, key, type)
          }
        }
      })
    } else {
      filterValue = context.cast(value).to(type)
    }

    return logic ? { [logic]: filterValue.map(i => ({ [key]: i })) } : filterValue
  }

  // separate inputs that are not meta
  // like select, sort, page, ...
  let notMetaInputs = filter(inputs, (i, k) => !Object.values(context.routeObject.meta).includes(k))

  // check that route is filterable
  // if not filters notMetaInputs should be empty
  // and no route filter should be applied
  if (!context.routeObject.filterable) {
    notMetaInputs = {}
  }

  const requestFilters = {}
  const notMetaInputsKeys = Object.keys(notMetaInputs)
  for (let inputKeyIndex = 0; inputKeyIndex < notMetaInputsKeys.length; inputKeyIndex += 1) {
    // decode key
    const inputKey = decodeURIComponent(notMetaInputsKeys[inputKeyIndex])

    // if property is $or
    if (inputKey === "$or") {
      if (isArray(notMetaInputs[inputKey])) {
        // for each array element of
        // get filter value
        // and push it to final $or property of fields
        const filters = []
        const orMetaInputArrayKeys = Object.keys(notMetaInputs[inputKey])
        for (let indexKey = 0; indexKey < orMetaInputArrayKeys.length; indexKey += 1) {
          const index = orMetaInputArrayKeys[indexKey]
          // each item of $or
          // has sub object that in that property is
          // defined like {prop : value}
          const keys = Object.keys(notMetaInputs[inputKey][index])
          for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
            const key = keys[keyIndex]
            const logicItemFilters = {}
            // eslint-disable-next-line no-await-in-loop
            const filterValue = await formatFilters(key, notMetaInputs[inputKey][index][key])
            if (filterValue !== undefined) {
              // check that filter value contains logic or not
              if (filterValue != null && filterValue.$or) {
                logicItemFilters.$or = logicItemFilters.$or || []
                logicItemFilters.$or = [...logicItemFilters.$or, ...filterValue.$or]
              } else if (filterValue != null && filterValue.$and) {
                logicItemFilters.$and = logicItemFilters.$and || []
                logicItemFilters.$and = [...logicItemFilters.$and, ...filterValue.$and]
              } else {
                logicItemFilters[key] = filterValue
              }

              filters.push(logicItemFilters)
            }
          }
        }

        if (filters.length) {
          requestFilters.$or = requestFilters.$or || []
          requestFilters.$or = [...requestFilters.$or, ...filters]
        }
      }
    } else {
      // get filter value
      // if filter contains logic
      // push the logic in global logic
      // other wise push it to direct filters
      // eslint-disable-next-line no-await-in-loop
      const filterValue = await formatFilters(inputKey, notMetaInputs[inputKey])
      if (filterValue !== undefined) {
        if (filterValue != null && filterValue.$or) {
          requestFilters.$or = requestFilters.$or || []
          requestFilters.$or = [...requestFilters.$or, ...filterValue.$or]
        } else if (filterValue != null && filterValue.$and) {
          requestFilters.$and = requestFilters.$and || []
          requestFilters.$and = [...requestFilters.$and, ...filterValue.$and]
        } else {
          requestFilters[inputKey] = filterValue
        }
      }
    }
  }

  // return final result
  // merge them with custom filters
  return {
    ...(isObject(defaultFilters) ? defaultFilters : {}),
    ...requestFilters,
    ...(isObject(customFilters) ? customFilters : {})
  }
}
