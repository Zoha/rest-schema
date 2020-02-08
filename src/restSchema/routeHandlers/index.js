module.exports = async context => {
  // set pagination headers -> x-total, x-page, ...
  await context.paginationHeaders();
  // response -> also can be with context.json();
  // this method will apply hide and .. to fields
  return context.resourcesResponse();
};
