const cast = require("../helpers/cast")
const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")
const unique = require("../helpers/unique")
const RestSchemaError = require("../errors/restSchemaError")

/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("./getRelations").relationObj} relationObj
 */

/**
 * creates an object that all get attempts keys (nested) will be pushed in an array
 * @returns {{object: object , keys: Array<string>}}
 */
const createKeySaverObject = () => {
  let proxy
  let keys = new Set([])
  proxy = {
    get(target, key) {
      if (key === "__isProxy") {
        return true
      }
      if (key === "value") {
        return target.value
      }
      if (target.prepend) {
        keys.delete(target.prepend.slice(0, -1))
      }
      keys.add(target.prepend + key)
      return new Proxy(
        { prepend: target.prepend + key + ".", value: `$$${target.prepend}${key}` },
        proxy
      )
    }
  }
  let object = new Proxy({ prepend: "", value: undefined }, proxy)

  return {
    object,
    keys
  }
}

const validOperatorsForRelationFilter = ["$eq", "$gt", "$gte", "$in", "$lt", "$lte", "$ne", "$nin"]

const reformatMatchForAggregateExprMatch = (
  parent = {},
  keyToSet = "root",
  key,
  operator = "$eq"
) => {
  const values = parent[keyToSet]
  let keyToSetChanged = false
  let result = isArray(values)
    ? []
    : {
        $exprAnds: []
      }
  for (const itemKey in values) {
    const itemValue = values[itemKey]
    if (itemValue === undefined) {
      continue
    }
    const exceptOperators = ["$and", "$or", "$nor", "$not"]

    if (itemKey.startsWith("$") && !exceptOperators.includes(itemKey)) {
      operator = itemKey
    } else if (!isArray(result)) {
      key = itemKey
    }

    if (isObject(itemValue) || isArray(itemValue)) {
      const nestedRes = reformatMatchForAggregateExprMatch(
        {
          ...values,
          ...result
        },
        itemKey,
        key,
        operator
      )
      key = nestedRes.key
      operator = nestedRes.operator
      if (nestedRes.keyToSet === "$and" && result.$and) {
        result.$and = [...result.$and, ...nestedRes.result]
      } else {
        result[nestedRes.keyToSet] = nestedRes.result
      }
    } else if (itemValue && itemValue.__isProxy) {
      if (!validOperatorsForRelationFilter.includes(operator)) {
        throw new RestSchemaError(`${operator} operator is invalid for relation match`)
      }
      if (isArray(result)) {
        keyToSet = operator
        result.push(itemValue.value)
        keyToSetChanged = true
      } else {
        result.$exprAnds.push({
          [operator]: ["$" + key, itemValue.value]
        })
      }
    } else {
      result[itemKey] = itemValue
    }
  }

  if (keyToSetChanged) {
    result = ["$" + key, result]
  }

  if (result.$exprAnds) {
    if (result.$exprAnds.length) {
      if (result.$and) {
        result.$and = [...result.$and, ...result.$exprAnds]
      } else {
        result.$and = result.$exprAnds
      }
    }
    delete result.$exprAnds
  }

  return { operator, key, result, keyToSet }
}

const replaceResourceReferencesWithExpression = obj => {
  const res = reformatMatchForAggregateExprMatch({ root: obj }, "root")
  return res.result
}

/**
 *
 * @param {Array<Object<string , object>>} allPipelines
 * @param {context} context
 * @param {relationObj} relation
 */
const getLookupPipeline = async (context, relation) => {
  const { keys, object: fakeResource } = createKeySaverObject()
  const inputs = await context.getInputs()
  const relationContext = relation.schemaBuilder.createRelationContext(
    context,
    relation,
    context.req,
    context.res,
    null,
    1,
    {
      inputs: isObject(inputs[relation.fieldName]) ? inputs[relation.fieldName] : undefined
    }
  )
  /** @type {import("../../../typeDefs/field").findCallback} */
  const findFunc = relation.field.find
  const matchObjRaw = await findFunc(fakeResource, context, relationContext, relation)
  const matchObj = replaceResourceReferencesWithExpression(matchObjRaw)
  const letKeys = [...keys]
    .map(i => i.split(".")[0])
    .filter(i => !!i)
    .reduce((a, b) => ({
      ...(isObject(a) ? a : { [a]: a }),
      [b]: b
    }))

  return {
    $lookup: {
      from: relation.schemaBuilder.collectionName,
      let: letKeys,
      pipeLine: [
        {
          $match: {
            $and: [await relationContext.getCustomFilters(), matchObj]
          }
        }
      ],
      as: "__" + relation.fieldName
    }
  }
}

/**
 * @this context
 * @param {object} [args]
 * @param {boolean} [args.setCollection]
 * @param {boolean} [args.force]
 * @param {object} [args.filters]
 * @param {number} [args.skip]
 * @param {number} [args.limit]
 * @param {object} [args.sort]
 * @param {string} [args.search]
 * @param {relationObj[]} [args.sortRelations]
 * @param {relationObj[]} [args.filterRelations]
 * @returns {Promise.<Array.<resource>>}
 */
module.exports = async function({
  setCollection = true,
  force = false,
  filters = null,
  skip = null,
  limit = null,
  sort = null,
  search = null,
  sortRelations = null,
  filterRelations = null
} = {}) {
  const context = this
  await context.hook("beforeGetAggregateCollection")

  if (!force && context.collection) {
    return context.collection
  }

  filters = cast(filters).to(Object) || {}
  skip = Number(skip) || (await context.getSkip())
  limit = Number(limit) || (await context.getLimit())
  search = cast(search).to(String) || (await context.getSearch())
  sort = cast(sort).to(Object) || null
  sortRelations = cast(sortRelations).to(Array) || []
  if (!sort && !sortRelations) {
    const sortData = await context.getSort({
      includeRelationSorts: true,
      includeRelationsInResult: true
    })
    sort = sortData.sort
    sortRelations = sortData.relations
  }

  if (!sort) {
    sort = {}
  }

  let allOtherFilters = context.cast(allOtherFilters).to(Object) || null
  filterRelations = context.cast(filterRelations).to(Array) || []
  if (!allOtherFilters && !allOtherFilters) {
    const filtersResult = await context.getFilters({
      includeRelationFilters: true,
      includeRelationsInResult: true
    })

    filterRelations = filtersResult.relations
    allOtherFilters = filtersResult.filters
  }

  if (!allOtherFilters) {
    allOtherFilters = {}
  }

  const loadRelations = await context.getLoadRelations()

  // pick up relations
  /** @type {Array.<import("./getRelations").relationObj>} */
  const relations = await unique(
    [...sortRelations, ...filterRelations, ...loadRelations],
    i => i.field.nestedKey
  )

  const aggregatePipelines = []

  // add lookup pipelines
  await Promise.all(
    relations.map(async relation => {
      aggregatePipelines.push(await getLookupPipeline(context, relation))
    })
  )

  // add match pipeline
  aggregatePipelines.push({
    $match: {
      ...allOtherFilters,
      ...filters
    }
  })

  // also add search $text in aggregation with filters meta
  if (search) {
    aggregatePipelines.push({
      $match: { $text: { $search: search } }
    })
  }

  // also add search $text in aggregation with filters meta
  let fieldSorts = { ...sort }
  let hasRandomSort = false
  if (fieldSorts[context.routeObject.meta.randomSort]) {
    hasRandomSort = true
    delete fieldSorts[context.routeObject.meta.randomSort]
  }
  aggregatePipelines.push({
    $sort: {
      ...fieldSorts,
      ...(search ? { $meta: "textScore" } : {})
    }
  })

  // get elements by random
  if (hasRandomSort) {
    aggregatePipelines.push({
      $sample: {
        size: limit
      }
    })
  } else {
    aggregatePipelines.push({
      $skip: skip
    })
    aggregatePipelines.push({
      $limit: limit
    })
  }

  const collection = await context.model.aggregate([
    ...aggregatePipelines,
    {
      $set: loadRelations.reduce((a, b) => ({
        ...(isObject(a) ? a : { [a.field.nestedKey]: `__${a.fieldName}` }),
        [b.field.nestedKey]: `__${b.fieldName}`
      }))
    },
    {
      $project: relations.reduce((a, b) => ({
        ...(isObject(a) ? a : { ["__" + a.fieldName]: 0 }),
        ["__" + b.fieldName]: 0
      }))
    }
  ])

  if (hasRandomSort) {
    context.total = limit
  } else {
    context.total = (
      await context.model.aggregate([
        ...aggregatePipelines,
        {
          $count: "total"
        }
      ])
    ).total
  }

  if (setCollection) {
    context.collection = collection
  }
  await context.hook("afterGetAggregateCollection")

  return collection
}
