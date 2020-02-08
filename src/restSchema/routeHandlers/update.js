module.exports = async context => {
  // in this step resource will be available at
  // req.resource and context.resource
  // because we have a id param in path

  // apply sanitize on request fields
  // also cast values and get default values
  await context.sanitizeFields();
  // validate fields of the request
  // also return's validated fields
  // will response with 400 and validation errors
  await context.validateFields({ response: true });
  // will create new resource from fields of request
  await context.updateResource();
  // get resource again for get new fields
  await context.getResource();
  // response -> also can be with context.json();
  // this method will apply hide and .. to fields
  // if res.content not set after callback
  // app will go to next route or middleware
  return context.resourceResponse();
};
