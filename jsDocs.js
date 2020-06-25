/**
 * @namespace RestSchema
 */

// RSContext
// RSSchemaBuilder

/**
 * @callback RSContextFunction
 * @param {RSContext} context
 * @returns {Promise.<*>}
 */

/**
 * @callback RSContextFunctionWithValue
 * @param {*} value
 * @param {RSContext} context
 * @returns {Promise.<*>}
 */

/**
 * @callback RSContextFunctionBoolean
 * @param {*} value
 * @param {RSContext} context
 * @returns {Promise.<boolean>}
 */

/**
 * @callback RSContextValidationFunction
 * @param {*} value
 * @param {RSContext} context`
 * @param {string} key
 * @returns {Promise.<boolean>}
 */

/**
 * @typedef {Object.<string,RSContextFunction>} RSRouteSpecificContextCallback
 */

/**
 * @typedef {Object.<string,RSContextFunctionWithValue>} RSRouteSpecificContextCallbackWithValue
 */

/**
 * @typedef {Object.<string,RSContextFunctionWithValue>} RSRouteSpecificContextCallbackBoolean
 */

/**
 * @typedef {Object.<string,RSContextValidationFunction>} RSRouteSpecificContextValidationFunction
 */

/**
 * find method typedef
 * @callback RSFieldFind
 * @param {Object} resource
 * @param {RSContext} ctx
 * @param {RSContext} relationCtx
 * @param {RSRelation} relation
 * @returns {Promise.<Object>}
 */

/**
 * @typedef {Object} RSField
 * @property {*} type
 * @property {string} key
 * @property {string} nestedKey
 * @property {string} uniqueKey
 * @property {boolean} isNested
 * @property {boolean} isArrayNested
 * @property {boolean} isObjectNested
 * @property {Object.<string,RSField>} children
 * @property {*} of
 * @property {boolean|Object.<string,boolean>|RSContextFunctionBoolean|RSRouteSpecificContextCallbackBoolean} creatable
 * @property {boolean|Object.<string,boolean>|RSContextFunctionBoolean|RSRouteSpecificContextCallbackBoolean} updatable
 * @property {boolean|Object.<string,boolean>|RSContextFunctionBoolean|RSRouteSpecificContextCallbackBoolean} filterable
 * @property {boolean|Object.<string,boolean>|RSContextFunctionBoolean|RSRouteSpecificContextCallbackBoolean} sortable
 * @property {boolean|Object.<string,boolean>|RSContextFunctionBoolean|RSRouteSpecificContextCallbackBoolean} hide
 * @property {boolean|Object.<string,boolean>|RSContextFunctionBoolean|RSRouteSpecificContextCallbackBoolean} hideByDefault
 * @property {RSContextFunctionWithValue|RSRouteSpecificContextCallbackWithValue} set
 * @property {RSContextFunctionWithValue|RSRouteSpecificContextCallbackWithValue} get
 * @property {RSContextFunctionWithValue|RSRouteSpecificContextCallbackWithValue} sanitize
 * @property {boolean|Object.<string,boolean>} trim
 * @property {boolean|Object.<string,boolean>} lowercase
 * @property {boolean|Object.<string,boolean>} uppercase
 * @property {RSContextFunction|RSRouteSpecificContextCallback} default
 * @property {boolean|Object.<string,boolean>|RSContextFunctionBoolean|RSRouteSpecificContextCallbackBoolean} pickUniqueItems
 * @property {string|RSSchemaBuilder} ref
 * @property {string} refPath
 * @property {RSFieldFind} find
 * @property {RSContextValidationFunction|RSRouteSpecificContextValidationFunction} validate
 * @property {boolean|Object.<string,boolean>} unique
 * @property {boolean|Object.<string,boolean>} required
 * @property {number|Object.<string,number>} min
 * @property {number|Object.<string,number>} max
 * @property {Array.<number>|Object.<string,Array.<number>>} between
 * @property {number|Object.<string,number>} minLength
 * @property {number|Object.<string,number>} maxLength
 * @property {Array.<number>|Object.<string,Array.<number>>} betweenLength
 * @property {RegExp|Object.<string,RegExp>} match
 * @property {Array.<string|number>|Object.<string,Array.<string|number>>} enum
 */

/**
 * @typedef {Object.<string,RSField>} RSSchemaFields
 */

/**
 * @typedef {object} RSSchemaPagination
 * @property {Object} defaultFilters
 * @property {number} page
 * @property {number} limit
 * @property {number} minLimit
 * @property {number} maxLimit
 */

/**
 * @callback RSFilteringOperatorCallback
 * @param {string} value value from inputs
 * @param {string} key key of filter
 * @param {*} type type to cast
 * @returns {Object}
 */

/**
 * @callback RSRouteHandlerCallback
 * @param {RSContext} context
 * @returns {*}
 */

/**
 * @typedef RSSchemaRouteMeta
 * @property {string} select
 * @property {string} sort
 * @property {string} limit
 * @property {string} skip
 * @property {string} page
 */

/**
 * @typedef {object} RSSchemaRoute
 * @property {Object.<string,RSFilteringOperatorCallback>} filteringOperators
 * @property {RSRouteHandlerCallback} handler
 * @property {RSSchemaRouteMeta} meta
 * @property {string} name
 * @property {"get"|"put"|"delete"|"post"|"patch"} method
 * @property {string} path
 * @property {Array.<string>} inputsTarget
 * @property {boolean} selectable
 * @property {boolean} filterable
 */

/**
 * @typedef {object} RSSchemaRoutes
 * @property {Object} index
 */

/**
 * @callback RSSchemaWrapperResponse
 * @param {*} response
 * @param {RSContext} context
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*}
 */

/**
 * @callback RSSchemaWrapperError
 * @param {Error} error
 * @param {RSContext} context
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*}
 */

/**
 * @typedef {object} RSSchemaWrappers
 * @property {RSSchemaWrapperResponse} response
 * @property {RSSchemaWrapperError} error
 */

/**
 * @typedef {object} RSMessagesValidations
 * @property {String} required
 * @property {String} min
 * @property {String} minLength
 * @property {String} max
 * @property {String} maxLength
 * @property {String} between
 * @property {String} betweenLength
 * @property {String} enum
 * @property {String} default
 * @property {String} match
 * @property {String} unique
 * @property {String} auth
 * @property {String} uniqueItems
 */

/**
 * @typedef {object} RSMessages
 * @property {String} idParamNotFound
 * @property {String} resourceNotFound
 * @property {String} validationPassed
 * @property {String} inactiveRouteMessage
 * @property {String} listOfErrors
 * @property {RSMessagesValidations} validations
 */

/**
 * @typedef {object} RSSchema
 * @property {RSSchemaRoutes} routes
 * @property {RSSchemaPagination} pagination
 * @property {RSSchemaWrappers} wrappers
 * @property {Object} filters
 * @property {*} middleware
 * @property {Array.<String>} routeKeys
 * @property {*} hooks
 * @property {RSSchemaFields} fields
 */

/**
 * @callback RSRouteMethod
 * @returns {*}
 */

/**
 * @callback RSMiddlewareList
 * @param {Object.<string,Array<function>>}
 */

/**
 * @callback RsHooks
 * @param {Object.<string,Object<string,function>>}
 */

/**
 * @typedef RSDefaults
 * @property {RSSchemaRoutes} defaultRoutes
 * @property {RSMessages} defaultMessages
 * @property {RSSchema} defaultSchema
 * @property {RSSchemaFields} defaultFields
 * @property {RSMiddlewareList} defaultPluginMiddlewareList
 * @property {RsHooks} defaultPluginHooks
 */

/**
 * add plugin to schema
 * @callback RSUse
 * @param {function} callback
 */

/**
 * @callback RSHookCallback
 * @param {RSContext} context
 */

/**
 * @callback RSAddHook
 * @param {string} route
 * @param {string} hookName
 * @param {RSHookCallback} hook
 */

/**
 * @callback RSAddMiddleware
 * @param {string} route
 * @param {function} middleware
 */

/**
 * @callback RSSetMessages
 * @param {RSMessages} newMessages
 */

/**
 * @callback RSSetValidationMessages
 * @param {RSMessagesValidations} newMessages
 */

/**
 * @callback RSSetValidationMessages
 * @param {RSSchemaRoute} newRoute
 */

/**
 * @callback RSSetValidationMessages
 * @param {RSSchemaRouteMeta} newRouteMeta
 */

/**
 * @callback RSSetDefaultRouteFilteringOperators
 * @param {Object.<string,RSFilteringOperatorCallback>} newFilteringOperators
 */

/**
 * @callback RSSetDefaultSchema
 * @param {RSSchema} newSchema
 */

/**
 * @callback RSSetDefaultSchemaFields
 * @param {RSSchemaFields} newFields
 */

/**
 * @callback RSSetDefaultSchemaPagination
 * @param {RSSchemaPagination} newPagination
 */

/**
 * @callback RSSetDefaultSchemaRoutes
 * @param {RSSchemaRoutes} newRoutes
 */

/**
 * @callback RSSetDefaultSchemaWrappers
 * @param {RSSchemaWrappers} newWrappers
 */

/**
 * @typedef {*} RSSchemaBuilder
 * @class
 * @property {RSSchema} schema
 * @property {RSRouteMethod} resource
 * @property {string} name
 * @property {RSDefaults} defaults
 * @property {RSUse} use
 * @property {RSAddMiddleware} addMiddleware
 * @property {RSAddHook} addHook
 * @property {RSSetMessages} setDefaultMessages
 * @property {RSSetValidationMessages} setDefaultValidationMessages
 * @property {RSSetDefaultRoute} setDefaultRoute
 * @property {RSSetDefaultRouteMeta} setDefaultRouteMeta
 * @property {RSSetDefaultRouteFilteringOperators} setDefaultRouteFilteringOperators
 * @property {RSSetDefaultSchema} setDefaultSchema
 * @property {RSSetDefaultSchemaFields} setDefaultSchemaFields
 * @property {RSSetDefaultSchemaPagination} setDefaultSchemaPagination
 * @property {RSSetDefaultSchemaRoutes} setDefaultSchemaRoutes
 * @property {RSSetDefaultSchemaWrappers} setDefaultSchemaWrappers
 */

/**
 * @typedef {Object} RSContext
 * @property {RSSchema} schema
 * @property {*} model
 * @property {string} route
 * @property {RSSchemaRoute} routeObject
 * @property {Object} relationFilters
 * @property {function} cast
 * @property {function} createResource
 * @property {function} deleteResource
 * @property {function} findLocationOfInput
 * @property {function} getCollection
 * @property {function} getCreateFields
 * @property {function} getCreateInputs
 * @property {function} getCustomFilters
 * @property {function} getFields
 * @property {function} getFilters
 * @property {function} getInputs
 * @property {function} getInputsFromFields
 * @property {function} getLimit
 * @property {function} getMessages
 * @property {function} getNestedField
 * @property {function} getNestedInput
 * @property {function} getPage
 * @property {function} getRelations
 * @property {function} getResource
 * @property {function} getResourceResponse
 * @property {function} getResponseValuesFromResource
 * @property {function} getRouteKeys
 * @property {function} getRouteKeysFilters
 * @property {function} getRoutes
 * @property {function} getSelectFields
 * @property {function} getSkip
 * @property {function} getSort
 * @property {function} getTotal
 * @property {function} getUpdateFields
 * @property {function} getUpdateInputs
 * @property {function} hook
 * @property {function} sanitizeInput
 * @property {function} sanitizeInputs
 * @property {function} setPaginationHeaders
 * @property {function} updateResource
 * @property {function} validateInput
 * @property {function} validateInputs
 * @property {function} getCollectionResponse
 */

/**
 * add new or return existing model
 * @param {String|*} model
 * @param {RSSchemaFields} fields
 * @param {RSSchema} options
 */

module.exports.types = {}
