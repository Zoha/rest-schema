const cast = require("../helpers/cast")
const isBoolean = require("../helpers/isBoolean")
const isObject = require("../helpers/isObject")
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
 * @param {string} [args.sortKey]
 * @param {object} [args.inputs]
 * @param {object} [args.defaultSort]
 * @param {string} [args.sortString]
 * @param {paginationProps} [args.pagination]
 * @param {boolean} [args.includeRelationSorts]
 * @param {boolean} [args.includeRelationsInResult]
 * @returns {Promise.<object>}
 */
module.exports = async function({
  inputs = null,
  sortKey = null,
  defaultSort = null,
  sortString = null,
  pagination = null,
  includeRelationSorts = false,
  includeRelationsInResult = false
} = {}) {
  const context = this
  pagination = context.cast(pagination).to(Object) || (await context.getPaginationData())
  inputs = cast(inputs).to(Object) || context.inputs || (await context.getInputs())
  sortKey = cast(sortKey).to(String) || context.routeObject.meta.sort || "sort"
  /** @type {Object.<string , number>} */
  let sort = cast(defaultSort).to(Object) || pagination.sort || {}
  sortString = cast(sortString).to(String) || inputs[sortKey]

  const sortRelations = []
  const relationsFields = {}
  /** @type {import("./getRelations").relationObj[]} */
  let relations = []
  let relationsLoaded = false
  const getRelations = async () => {
    relations = await context.getRelations()
    relationsLoaded = true
  }

  if ((sortString && typeof sortString === "string") || isObject(sortString)) {
    const sortsObject = {}
    let requestedSorts = []
    if (isObject(sortString)) {
      Object.keys(sortString).forEach(key => {
        requestedSorts.push(sortString[key] > 0 ? key : `-${key}`)
      })
    } else {
      requestedSorts = sortString.split(" ")
    }

    const formatRequestedSort = async requestedSort => {
      if (!requestedSort) {
        return
      }
      let requestedSortKey = requestedSort.replace(/^-/, "")
      // if type of field not found return undefined
      let field = await context.getNestedField({ key: requestedSortKey, ignoreArrayIndexes: true })

      // field does not exists in context check that maybe field is relation field
      if (includeRelationSorts && field == null) {
        if (!relations.length && !relationsLoaded) {
          await getRelations()
        }
        const relatedRelation = relations.find(
          r =>
            r.field.sortable &&
            (requestedSortKey.startsWith(r.field.nestedKey + ".") ||
              requestedSortKey.startsWith(r.nestedKeyWithoutArrayIndex + "."))
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
            key: requestedSortKey.substr(relatedRelation.nestedKey.length + 1),
            ignoreArrayIndexes: true,
            fields: relatedRelationFields
          })
          if (!field && relatedRelation.nestedKeyWithoutArrayIndex !== relatedRelation.nestedKey) {
            field = await context.getNestedField({
              key: requestedSortKey.substr(relatedRelation.nestedKeyWithoutArrayIndex.length + 1),
              ignoreArrayIndexes: true,
              fields: relatedRelationFields
            })
          }
        }
        if (field != null) {
          sortRelations.push(relatedRelation)
          requestedSortKey = "__" + requestedSortKey
        }
      }

      if (field == null || !field.sortable) {
        return
      }

      if (typeof field.sortable === "function" && !(await field.sortable(context))) {
        return
      }

      if (
        isObject(field.sortable) &&
        (typeof field.sortable[context.route] === "function" ||
          isBoolean(field.sortable[context.route]))
      ) {
        const sortable = field.sortable[context.route]
        if (typeof sortable === "function" && !(await sortable(context))) {
          return
        }
        if (!field.sortable[context.route]) {
          return false
        }
      }

      let orderOperator = 1
      if (/^-/.test(requestedSort)) {
        orderOperator = -1
      }
      sortsObject[requestedSortKey] = orderOperator
    }

    const formattingRequestedSortsPromises = []
    Object.values(requestedSorts).forEach(requestedSort => {
      formattingRequestedSortsPromises.push(formatRequestedSort(requestedSort))
    })
    await Promise.all(formattingRequestedSortsPromises)
    sort = sortsObject
  }

  if (includeRelationSorts && includeRelationsInResult) {
    return {
      relations: await unique(sortRelations, i => i.field.nestedKey, context),
      sort
    }
  }
  return sort
}
