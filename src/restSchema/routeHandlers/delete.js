module.exports = async context => {
  // in this step resource will be available at
  // req.resource and context.resource
  // because we have a id param in path
  await context.deleteResource();
  // response -> also can be with context.json();
  // this method will apply hide and .. to fields
  // if res.content not set after callback
  // app will go to next route or middleware
  return context.resourceResponse();
};
