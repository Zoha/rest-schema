const { defaultSchema } = require("../defaults")
const cast = require("../helpers/cast")

module.exports = (
  newDefaultSchema,
  { target = defaultSchema, mergeFields = true, mergeRoutes = true } = {}
) => {
  newDefaultSchema = cast(newDefaultSchema).to(Object)
  if (!newDefaultSchema) {
    return
  }

  // set schema fields
  if (newDefaultSchema.fields && mergeFields) {
    module.exports.setDefaultSchemaFields(newDefaultSchema.fields, {
      target: target.fields
    })
    delete newDefaultSchema.fields
  }

  // set schema routes
  if (newDefaultSchema.routes && mergeRoutes) {
    module.exports.setDefaultSchemaRoutes(newDefaultSchema.routes, {
      target: target.routes
    })
    delete newDefaultSchema.routes
  }

  // set schema pagination
  if (newDefaultSchema.pagination) {
    module.exports.setDefaultSchemaPagination(newDefaultSchema.pagination, {
      target: target.pagination
    })
    delete newDefaultSchema.pagination
  }

  // set schema wrappers
  if (newDefaultSchema.wrappers) {
    module.exports.setDefaultSchemaWrappers(newDefaultSchema.wrappers, {
      target: target.wrappers
    })
    delete newDefaultSchema.wrappers
  }

  Object.entries(newDefaultSchema).forEach(([key, value]) => {
    target[key] = value
  })
}

module.exports.setDefaultSchemaFields = (
  newDefaultSchemaFields,
  { target = defaultSchema.fields } = {}
) => {
  newDefaultSchemaFields = cast(newDefaultSchemaFields).to(Object)
  if (!newDefaultSchemaFields) {
    return
  }

  Object.entries(newDefaultSchemaFields).forEach(([key, value]) => {
    target[key] = value
  })
}

module.exports.setDefaultSchemaRoutes = (
  newDefaultSchemaRoutes,
  { target = defaultSchema.routes } = {}
) => {
  newDefaultSchemaRoutes = cast(newDefaultSchemaRoutes).to(Object)
  if (!newDefaultSchemaRoutes) {
    return
  }

  Object.entries(newDefaultSchemaRoutes).forEach(([key, value]) => {
    target[key] = value
  })
}

module.exports.setDefaultSchemaPagination = (
  newDefaultSchemaPagination,
  { target = defaultSchema.pagination } = {}
) => {
  newDefaultSchemaPagination = cast(newDefaultSchemaPagination).to(Object)
  if (!newDefaultSchemaPagination) {
    return
  }

  Object.entries(newDefaultSchemaPagination).forEach(([key, value]) => {
    target[key] = value
  })
}

module.exports.setDefaultSchemaWrappers = (
  newDefaultSchemaWrappers,
  { target = defaultSchema.wrappers } = {}
) => {
  newDefaultSchemaWrappers = cast(newDefaultSchemaWrappers).to(Object)
  if (!newDefaultSchemaWrappers) {
    return
  }

  Object.entries(newDefaultSchemaWrappers).forEach(([key, value]) => {
    target[key] = value
  })
}
