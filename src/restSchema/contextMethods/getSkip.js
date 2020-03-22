const getPage = function(context) {
  let page = Number(context.schema.pagination.page)
  const { inputs } = context
  const pageKey = context.routeObject.meta.page

  if (Number.isNaN(page)) {
    page = undefined
  }

  if (inputs[pageKey]) {
    page = Number(inputs[pageKey])
    if (Number.isNaN(page)) {
      page = undefined
    }
  }
  return page
}

module.exports = function() {
  const context = this
  let skip = Number(context.schema.pagination.skip)
  const { inputs } = this
  const skipKey = context.routeObject.meta.skip
  const page = getPage(context)
  const limit = context.getLimit()

  if (Number.isNaN(skip)) {
    skip = 0
  }

  if (inputs[skipKey]) {
    skip = Number(inputs[skipKey])
    if (Number.isNaN(skip)) {
      skip = 0
    }
  } else if (page) {
    skip = (page - 1) * limit
    if (Number.isNaN(skip)) {
      skip = 0
    }
  }
  return skip
}
