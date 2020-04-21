const cast = require("../helpers/cast")

const getPage = function({ inputs, pageInputKey, defaultPage }) {
  let page = defaultPage
  if (Number.isNaN(page)) {
    page = undefined
  }

  if (inputs[pageInputKey]) {
    page = Number(inputs[pageInputKey])
    if (Number.isNaN(page)) {
      page = undefined
    }
  }
  return page
}

module.exports = async function({
  skip = null,
  inputs = null,
  skipInputKey = null,
  page = null,
  pageInputKey = null,
  defaultPage = null,
  limit = null
} = {}) {
  const context = this
  let targetSkip = Number(skip) || Number(context.schema.pagination.skip)
  inputs = cast(inputs).to(Object) || context.inputs || (await context.getInputs())
  skipInputKey = cast(skipInputKey).to(String) || context.routeObject.meta.skip || "skip"
  pageInputKey = cast(pageInputKey).to(String) || context.routeObject.meta.page || "page"
  defaultPage = cast(defaultPage).to(Number) || Number(context.schema.pagination.page)
  page = cast(page).to(Number) || (await getPage({ inputs, pageInputKey, defaultPage }))
  limit = cast(limit).to(Number) || (await context.getLimit())

  if (Number.isNaN(targetSkip)) {
    targetSkip = 0
  }

  if (inputs[skipInputKey]) {
    targetSkip = Number(inputs[skipInputKey])
    if (Number.isNaN(targetSkip)) {
      targetSkip = 0
    }
  } else if (page) {
    targetSkip = (page - 1) * limit
    if (Number.isNaN(targetSkip)) {
      targetSkip = 0
    }
  }
  return targetSkip
}
