module.exports = async context => {
  // apply sanitize on request fields
  // also cast values and get default values
  await context.sanitizeInputs();
  // validate fields of the request
  // also return's validated fields
  // will response with 400 and validation errors
  await context.validateInputs({ response: true });
  // will create new resource from fields of request
  await context.createResource();
  // response -> also can be with context.json();
  // this method will apply hide and .. to fields
  // if res.content not set after callback
  // app will go to next route or middleware
  return context.resourceResponse();
};
