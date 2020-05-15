const filterObject = require("./filter")

module.exports = filters => {
  if (!filters.length) {
    return {}
  }

  const andsForOrs = []
  let finalFilters = {}
  filters.filter(filter => {
    if (filter.$or && filter.$or.length) {
      andsForOrs.push({
        $or: filter.$or
      })
    }
    finalFilters = {
      ...finalFilters,
      ...filterObject(filter, (i, k) => k !== "$or")
    }
  })
  if (andsForOrs.length) {
    finalFilters.$and = andsForOrs
  }

  return finalFilters
}
