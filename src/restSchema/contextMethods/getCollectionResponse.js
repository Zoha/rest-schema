module.exports = async function() {
  const context = this;
  await context.hook("beforeGetCollectionResponse");
  const collection = context.collection || (await context.getCollection());
  let finalResponseFromCollection = [];
  for (let resource of collection) {
    finalResponseFromCollection.push(
      await this.getResponseValuesFromResource(context.fields, resource)
    );
  }
  context.response = finalResponseFromCollection;
  await context.hook("beforeGetCollectionResponse");
  return finalResponseFromCollection;
};
