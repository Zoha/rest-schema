/**
 * @typedef {import("./schema").schema} schema
 */

/**
 * @typedef {import("./field").fields} fields
 */

/**
 * @typedef {import("mongoose").Document} resourceDocument
 * @typedef {resourceDocument & Object<string , any>} resource
 */

/**
 * @typedef {import("mongoose").Model} modelDocument
 * @typedef {modelDocument & Object<string , any>} model
 */

/**
 * @typedef {import("./route").route} route
 */

/**
 * @typedef {import("../src/restSchema/defaults").defaults} defaultDefaults
 * @typedef {defaultDefaults & Object<string , *>} defaults
 */

/**
 * @typedef {import("./schema").paginationProps} paginationProps
 */

/**
 * @typedef {object} contextMethods
 * @property {import('../src/restSchema/contextMethods/cast')} cast
 * @property {import('../src/restSchema/contextMethods/createResource')} createResource
 * @property {import('../src/restSchema/contextMethods/deleteResource')} deleteResource
 * @property {import('../src/restSchema/contextMethods/findLocationOfInput')} findLocationOfInput
 * @property {import('../src/restSchema/contextMethods/getAggregateCollection')} getAggregateCollection
 * @property {import('../src/restSchema/contextMethods/getAggregateResource')} getAggregateResource
 * @property {import('../src/restSchema/contextMethods/getCollection')} getCollection
 * @property {import('../src/restSchema/contextMethods/getCreateFields')} getCreateFields
 * @property {import('../src/restSchema/contextMethods/getCreateInputs')} getCreateInputs
 * @property {import('../src/restSchema/contextMethods/getCustomFilters')} getCustomFilters
 * @property {import('../src/restSchema/contextMethods/getFields')} getFields
 * @property {import('../src/restSchema/contextMethods/getFilters')} getFilters
 * @property {import('../src/restSchema/contextMethods/getInputs')} getInputs
 * @property {import('../src/restSchema/contextMethods/getInputsFromFields')} getInputsFromFields
 * @property {import('../src/restSchema/contextMethods/getLimit')} getLimit
 * @property {import('../src/restSchema/contextMethods/getLoadRelations')} getLoadRelations
 * @property {import('../src/restSchema/contextMethods/getMessages')} getMessages
 * @property {import('../src/restSchema/contextMethods/getNestedField')} getNestedField
 * @property {import('../src/restSchema/contextMethods/getNestedInput')} getNestedInput
 * @property {import('../src/restSchema/contextMethods/getPage')} getPage
 * @property {import('../src/restSchema/contextMethods/getPaginationData')} getPaginationData
 * @property {import('../src/restSchema/contextMethods/getRelations')} getRelations
 * @property {import('../src/restSchema/contextMethods/getResource')} getResource
 * @property {import('../src/restSchema/contextMethods/getResourceResponse')} getResourceResponse
 * @property {import('../src/restSchema/contextMethods/getResponseValuesFromResource')} getResponseValuesFromResource
 * @property {import('../src/restSchema/contextMethods/getRouteKeys')} getRouteKeys
 * @property {import('../src/restSchema/contextMethods/getRouteKeysFilters')} getRouteKeysFilters
 * @property {import('../src/restSchema/contextMethods/getRoutes')} getRoutes
 * @property {import('../src/restSchema/contextMethods/getSearch')} getSearch
 * @property {import('../src/restSchema/contextMethods/getSelectFields')} getSelectFields
 * @property {import('../src/restSchema/contextMethods/getSkip')} getSkip
 * @property {import('../src/restSchema/contextMethods/getSort')} getSort
 * @property {import('../src/restSchema/contextMethods/getTotal')} getTotal
 * @property {import('../src/restSchema/contextMethods/getUpdateFields')} getUpdateFields
 * @property {import('../src/restSchema/contextMethods/getUpdateInputs')} getUpdateInputs
 * @property {import('../src/restSchema/contextMethods/hook')} hook
 * @property {import('../src/restSchema/contextMethods/sanitizeInput')} sanitizeInput
 * @property {import('../src/restSchema/contextMethods/sanitizeInputs')} sanitizeInputs
 * @property {import('../src/restSchema/contextMethods/setMeta')} setMeta
 * @property {import('../src/restSchema/contextMethods/setPaginationHeaders')} setPaginationHeaders
 * @property {import('../src/restSchema/contextMethods/updateResource')} updateResource
 * @property {import('../src/restSchema/contextMethods/validateInput')} validateInput
 * @property {import('../src/restSchema/contextMethods/validateInputs')} validateInputs
 * @property {import('../src/restSchema/contextMethods/getCollectionResponse')} getCollectionResponse
 * @property {import('../src/restSchema/contextMethods/getDirtyInputs')} getDirtyInputs
 *
 */

/**
 * @typedef {object} validationError
 * @property {string} field
 * @property {*} value
 * @property {string} message
 * @property {string} location
 *
 * @typedef {Array.<validationError>} validationErrors
 */

/**
 * @typedef {import("express").Request} request
 * @typedef {import("express").Response} response
 */

/**
 * @typedef {import("../src/restSchema/contextMethods/getRelations").relationObj} relationObj
 */

/**
 * @typedef {object} contextProps
 * @property {schema} schema
 * @property {model} model
 * @property {('index' | 'single' | 'get' | 'update' | 'validate' | 'count' | 'delete' | string)} route
 * @property {route} routeObject
 * @property {defaults} defaults
 * @property {object} relationFilters
 * @property {resource} [resource]
 * @property {resource} [updatedResource]
 * @property {resource} [createdResource]
 * @property {resource} [deletedResource]
 * @property {resource} [deletedResource]
 * @property {Array.<resource>} [collection]
 * @property {number} [relationDepth]
 * @property {request & Object.<string , any>} [req]
 * @property {response & Object.<string , any>} [res]
 * @property {function} [next]
 * @property {fields} [fields]
 * @property {object} [response]
 * @property {object} [collectionResponse]
 * @property {object} [inputs]
 * @property {object} [createInputs]
 * @property {object} [updateInputs]
 * @property {string[]} [routeKeys]
 * @property {number} [total]
 * @property {validationErrors} [validationErrors]
 * @property {boolean} [isRelation]
 * @property {relationObj} [relation]
 * @property {context} [parent]
 * @property {object} [dirtyInputs]
 * @property {paginationProps} [pagination]
 * @property {object} [dynamicFilters]
 * @property {Array.<relationObj>} [loadRelations]
 * @property {string} [search]
 *
 *
 * @typedef {contextProps & contextMethods} context
 */

module.exports = {}
