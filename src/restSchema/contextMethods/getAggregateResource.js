const cast = require("../helpers/cast")
const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")
const RestSchemaError = require("../errors/restSchemaError")
const deepMergeFilters = require("../helpers/deepMergeFilters")
const { NotFoundError } = require("../errors")

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
      as: "__" + relation.field.nestedKey
    }
  }
}

/**
 * @this context
 * @param {object} [args]
 * @param {boolean} [args.errorOnNotFound]
 * @param {boolean} [args.setResource]
 * @param {boolean} [args.force]
 * @param {object} [args.filters]
 * @param {*} [args.resourceId]
 * @returns {Promise.<Array.<resource>>}
 */
module.exports = async function({
  errorOnNotFound = false,
  setResource = true,
  force = false,
  filters = null,
  resourceId = null
} = {}) {
  const context = this
  await context.hook("beforeGetAggregateResource")

  const validationMessages = (await context.getMessages()).validations

  if (!force && context.resource) {
    return context.resource
  }

  filters = cast(filters).to(Object) || {}

  /** @type {Array.<import("./getRelations").relationObj>} */
  const relations = await context.getLoadRelations()

  const aggregatePipelines = []

  let finalFilters
  if (resourceId) {
    finalFilters = { _id: resourceId }
  } else {
    let getRouteKeysFilters = {}
    getRouteKeysFilters = {
      $or: await context.getRouteKeysFilters()
    }
    if (!getRouteKeysFilters.$or.length) {
      getRouteKeysFilters = {}
    }
    finalFilters = deepMergeFilters([
      getRouteKeysFilters,
      await context.getCustomFilters(),
      filters
    ])
  }

  // add match pipeline
  aggregatePipelines.push({
    $match: {
      ...finalFilters
    }
  })

  aggregatePipelines.push({
    $limit: 1
  })

  // add lookup pipelines
  await Promise.all(
    relations.map(async relation => {
      aggregatePipelines.push(await getLookupPipeline(context, relation))
    })
  )

  const resources = await context.model.aggregate([
    ...aggregatePipelines,

    {
      $set: relations.reduce((a, b) => ({
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

  const resource = resources[0]

  if (errorOnNotFound && !resource) {
    throw new NotFoundError(validationMessages.resourceNotFound)
  }

  if (setResource && !!resource) {
    context.resource = resource
  }

  if (setResource) {
    context.resource = resource
  }
  await context.hook("beforeGetAggregateResource")

  return resource
}
