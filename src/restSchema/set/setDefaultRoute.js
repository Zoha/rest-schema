const { defaultRoute } = require("../defaults")
const cast = require("../helpers/cast")

module.exports = (
  newDefaultRouteData,
  { target = defaultRoute, mergeFilteringOperators = true } = {}
) => {
  newDefaultRouteData = cast(newDefaultRouteData).to(Object)
  if (!newDefaultRouteData) {
    return
  }

  // set route meta
  if (newDefaultRouteData.meta) {
    module.exports.setDefaultRouteMeta(newDefaultRouteData.meta, {
      target: target.meta
    })
    delete newDefaultRouteData.meta
  }

  // set route filteringOperators
  if (newDefaultRouteData.filteringOperators && mergeFilteringOperators) {
    module.exports.setDefaultRouteFilteringOperators(newDefaultRouteData.filteringOperators, {
      target: target.filteringOperators
    })
    delete newDefaultRouteData.filteringOperators
  }

  Object.entries(newDefaultRouteData).forEach(([key, value]) => {
    target[key] = value
  })
}

module.exports.setDefaultRouteMeta = (newDefaultRouteMeta, { target = defaultRoute.meta } = {}) => {
  newDefaultRouteMeta = cast(newDefaultRouteMeta).to(Object)
  if (!newDefaultRouteMeta) {
    return
  }

  Object.entries(newDefaultRouteMeta).forEach(([key, value]) => {
    target[key] = value
  })
}

module.exports.setDefaultRouteFilteringOperators = (
  newDefaultRouteFilteringOperators,
  { target = defaultRoute.filteringOperators } = {}
) => {
  newDefaultRouteFilteringOperators = cast(newDefaultRouteFilteringOperators).to(Object)
  if (!newDefaultRouteFilteringOperators) {
    return
  }

  Object.entries(newDefaultRouteFilteringOperators).forEach(([key, value]) => {
    target[key] = value
  })
}
