const filter = require("../helpers/filter")
const isObject = require("../helpers/isObject")
const isArray = require("../helpers/isArray")
const cast = require("../helpers/cast")
const isFunction = require("../helpers/isFunction")
const escapeStringRegexp = require("../helpers/escapeStringRegexp")
const unique = require("../helpers/unique")

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
 * @typedef {import("../../../typeDefs/schema").paginationProps} paginationProps
 */

/**
 * @this context
 * @param {object} [args]
 * @param {object} [args.inputs]
 * @param {import("../../../typeDefs/route").filteringOperators} [args.operators]
 * @param {object} [args.defaultRouteFilters]
 * @param {object} [args.customFilters]
 * @param {object} [args.filteringMeta]
 * @param {paginationProps} [args.pagination]
 * @param {false} [args.includeRelationFilters]
 * @param {boolean} [args.includeRelationsInResult]
 * @returns {Promise.<object>}
 */
module.exports = async function({
  inputs = null,
  operators = null,
  defaultRouteFilters = null,
  customFilters = null,
  filteringMeta = null,
  pagination = null,
  includeRelationFilters = false,
  includeRelationsInResult = false
} = {}) {
  const context = this
  const allInputs = inputs || context.inputs || (await context.getInputs())
  pagination = context.cast(pagination).to(Object) || (await context.getPaginationData())
  operators = cast(operators).to(Object) || context.routeObject.filteringOperators
  let defaultFilters = cast(defaultRouteFilters).to(Object) || pagination.defaultFilters
  if (isFunction(defaultFilters)) {
    defaultFilters = await defaultFilters(context)
  }
  customFilters = customFilters || (await context.getCustomFilters())
  filteringMeta = filteringMeta || context.routeObject.meta

  const filterRelations = []
  const relationsFields = {}
  /** @type {import("./getRelations").relationObj[]} */
  let relations = []
  let relationsLoaded = false
  const getRelations = async () => {
    relations = await context.getRelations()
    relationsLoaded = true
  }

  const formatFilters = async (/** @type {string} */ key, argValue) => {
    let logic
    let filterValue

    // if type of field not found return undefined
    let field = await context.getNestedField({ key, ignoreArrayIndexes: true })

    // field does not exists in context check that maybe field is relation field
    if (includeRelationFilters && field == null) {
      if (!relations.length && !relationsLoaded) {
        await getRelations()
      }
      const relatedRelation = relations.find(
        r =>
          r.field.filterable &&
          (key.startsWith(r.field.nestedKey + ".") ||
            key.startsWith(r.nestedKeyWithoutArrayIndex + "."))
      )
      let relatedRelationFields
      if (relatedRelation) {
        if (relationsFields[relatedRelation.field.nestedKey]) {
          relatedRelationFields = relationsFields[relatedRelation.field.nestedKey]
        } else {
          relatedRelationFields = await relatedRelation.schemaBuilder.tempContext.getFields()
          relationsFields[relatedRelation.field.nestedKey] = relatedRelationFields
        }
      }
      if (relatedRelationFields) {
        field = await context.getNestedField({
          key: key.substr(relatedRelation.nestedKey.length + 1),
          ignoreArrayIndexes: true,
          fields: relatedRelationFields
        })
        if (!field && relatedRelation.nestedKeyWithoutArrayIndex !== relatedRelation.nestedKey) {
          field = await context.getNestedField({
            key: key.substr(relatedRelation.nestedKeyWithoutArrayIndex.length + 1),
            ignoreArrayIndexes: true,
            fields: relatedRelationFields
          })
        }
      }

      if (field != null) {
        filterRelations.push(relatedRelation)
        key = "__" + key
      }
    }

    if (field == null || !field.filterable || field.type == null) {
      return {}
    }
    const { type } = field

    // convert value to string and url decode it
    const value = decodeURIComponent(cast(argValue).to(String))

    if (value == null) {
      return {}
    }

    // change hasOperator if string
    // starts with an operator
    let hasOperator
    Object.keys(operators).every(operator => {
      const includingOperatorRegexp = new RegExp(`[,|]+${escapeStringRegexp(operator)}`)
      if (!hasOperator && (value.startsWith(operator) || includingOperatorRegexp.test(value))) {
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
          .map(i => escapeStringRegexp(i.replace(":", "")))
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
        const result = /(\$[^:]+):?(.*)/.exec(section)
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
      filterValue = cast(value).to(type)
    }

    return {
      filterValue: logic ? { [logic]: filterValue.map(i => ({ [key]: i })) } : filterValue,
      filterKey: key
    }
  }

  // separate inputs that are not meta
  // like select, sort, page, ...
  let notMetaInputs = filter(allInputs, (i, k) => !Object.values(filteringMeta).includes(k))

  // check that route is filterable
  // if not filters notMetaInputs should be empty
  // and no route filter should be applied
  if (!context.routeObject && context.routeObject.filterable) {
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
            let key = keys[keyIndex]
            const logicItemFilters = {}
            // eslint-disable-next-line no-await-in-loop
            const { filterValue, filterKey } = await formatFilters(
              key,
              notMetaInputs[inputKey][index][key]
            )
            key = filterKey
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
      const { filterKey, filterValue } = await formatFilters(inputKey, notMetaInputs[inputKey])
      if (filterValue !== undefined) {
        if (filterValue != null && filterValue.$or) {
          requestFilters.$or = requestFilters.$or || []
          requestFilters.$or = [...requestFilters.$or, ...filterValue.$or]
        } else if (filterValue != null && filterValue.$and) {
          requestFilters.$and = requestFilters.$and || []
          requestFilters.$and = [...requestFilters.$and, ...filterValue.$and]
        } else {
          requestFilters[filterKey] = filterValue
        }
      }
    }
  }

  // return final result
  // merge them with custom filters
  let finalResult
  customFilters = isObject(customFilters) ? customFilters : {}
  if (customFilters.$and || customFilters.$or) {
    finalResult = {
      $and: [
        {
          ...(isObject(defaultFilters) ? defaultFilters : {}),
          ...requestFilters
        },
        isObject(customFilters) ? customFilters : {}
      ]
    }
  } else {
    finalResult = {
      ...(isObject(defaultFilters) ? defaultFilters : {}),
      ...requestFilters,
      ...(isObject(customFilters) ? customFilters : {})
    }
  }

  if (includeRelationFilters && includeRelationsInResult) {
    return {
      relations: await unique(filterRelations, i => i.field.nestedKey, context),
      filters: finalResult
    }
  } else {
    return finalResult
  }
}
