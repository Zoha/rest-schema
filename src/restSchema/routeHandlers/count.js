module.exports = async context => {
  // get filtered resources using req.query params
  // will return filtered resource and also save them in
  // req.rest.filteredResources
  const resources = await context.getCollection();
  // response to the user
  // app will not go to next middleware or route
  // because we have a response
  return context.res.json({
    total: resources.length
  });
};
