const cast = require("../helpers/cast")

const getPage = function({ targetInputs, pageKey, pageDefault }) {
  let page = pageDefault
  if (Number.isNaN(page)) {
    page = undefined
  }

  if (targetInputs[pageKey]) {
    page = Number(targetInputs[pageKey])
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
  const targetInputs = cast(inputs).to(Object) || context.inputs || (await context.getInputs())
  const skipKey = cast(skipInputKey).to(String) || context.routeObject.meta.skip || "skip"
  const pageKey = cast(pageInputKey).to(String) || context.routeObject.meta.page || "page"
  const pageDefault = defaultPage || Number(context.schema.pagination.page)
  const targetPage =
    cast(page).to(Number) || (await getPage({ targetInputs, pageKey, pageDefault }))
  const targetLimit = limit || (await context.getLimit())

  if (Number.isNaN(targetSkip)) {
    targetSkip = 0
  }

  if (targetInputs[skipKey]) {
    targetSkip = Number(targetInputs[skipKey])
    if (Number.isNaN(targetSkip)) {
      targetSkip = 0
    }
  } else if (targetPage) {
    targetSkip = (targetPage - 1) * targetLimit
    if (Number.isNaN(targetSkip)) {
      targetSkip = 0
    }
  }
  return targetSkip
}
