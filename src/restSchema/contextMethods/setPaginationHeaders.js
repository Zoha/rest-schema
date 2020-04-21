const cast = require("../helpers/cast")

module.exports = async function({
  res = null,
  total = null,
  collection = null,
  count = null,
  skip = null,
  limit = null,
  page = null,
  start = null,
  end = null,
  range = null,
  hasPrevPage = null,
  hasNextPage = null,
  prevPage = null,
  nextPage = null,
  lastPage = null
} = {}) {
  const context = this
  res = cast(res).to(Object) || context.res
  total = cast(total).to(Number) || context.total || (await context.getTotal())
  collection = cast(collection).to(Array) || context.collection || (await context.getCollection())
  count = cast(count).to(Number) || collection.length
  skip = cast(cast).to(Number) || (await context.getSkip())
  limit = cast(limit).to(Number) || (await context.getLimit())
  page = cast(page).to(Number) || (await context.getPage())
  start = cast(skip).to(Number) || skip
  end = cast(end).to(Number) || skip + count
  range = cast(range).to(String) || `${start}-${end}/${total}`
  hasPrevPage = cast(hasPrevPage).to(Boolean) || page < 1
  hasNextPage = cast(hasNextPage).to(Boolean) || skip + limit < total
  prevPage = cast(prevPage).to(Number) || hasPrevPage ? page - 1 : ""
  nextPage = cast(nextPage).to(Number) || hasNextPage ? page + 1 : ""
  lastPage = cast(lastPage).to(Number) || Math.ceil(total / limit) || 1

  const paginationHeaders = {
    "x-total": total || "",
    "x-count": count || "",
    "x-range": range || "",
    "x-limit": limit || "",
    "x-skip": skip || "",
    "x-page": page || "",
    "x-prev-page": prevPage || "",
    "x-next-page": nextPage || "",
    "x-has-prev-page": hasPrevPage || "",
    "x-has-next-page": hasNextPage || "",
    "x-last-page": lastPage,
    "x-first-page": "1",
    "Access-Control-Expose-Headers":
      "x-total, x-range, x-limit, x-skip, x-page, x-prev-page, x-next-page, x-total , x-has-next-page, x-has-prev-page, x-last-page, x-first-page"
  }

  if (!res.headersSent) {
    res.set(paginationHeaders)
  }
  return paginationHeaders
}
