module.exports = async function({
  inputs = null,
  sortKey = null,
  defaultSort = null,
  sortString = null
} = {}) {
  const context = this
  inputs = inputs || context.inputs || (await context.getInputs())
  sortKey = sortKey || context.routeObject.meta.sort || "sort"
  let sort = defaultSort || context.schema.pagination.sort
  sortString = sortString || inputs[sortKey]
  if (sortString && typeof sortString === "string") {
    const sortsObject = {}
    const requestedSorts = sortString.split(" ")

    const formatRequestedSort = async requestedSort => {
      if (!requestedSort) {
        return
      }
      const requestedSortKey = requestedSort.replace(/^-/, "")
      // if type of field not found return undefined
      const field = await context.getNestedField(requestedSortKey)

      if (field == null || !field.sortable) {
        return
      }

      if (typeof field.sortable === "function" && !(await field.sortable(context))) {
        return
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
  return sort
}
