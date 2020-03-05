module.exports = async function() {
  const context = this;
  const res = context.res;
  const total = context.total || (await context.getTotal());
  const collection = context.collection || (await context.getCollection());
  const count = collection.length;
  const skip = context.getSkip();
  const limit = context.getLimit();
  const page = context.getPage();
  const start = skip;
  const end = skip + count;
  const range = `${start}-${end}/${total}`;
  const hasPrevPage = 1 > page;
  const hasNextPage = skip + limit < total;
  const prevPage = hasPrevPage ? page - 1 : "";
  const nextPage = hasNextPage ? page + 1 : "";
  const lastPage = Math.ceil(total / limit) || 1;

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
  };

  if (!res.headersSent) {
    res.set(paginationHeaders);
  }
  return paginationHeaders;
};
