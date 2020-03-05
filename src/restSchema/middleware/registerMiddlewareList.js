module.exports = (schema, routeObject) => {
  const schemaMiddlewareList = schema.middleware;

  if (
    Array.isArray(schemaMiddlewareList) ||
    typeof schemaMiddlewareList == "function"
  ) {
    // if middleware list was function or an array
    return schemaMiddlewareList;
  } else {
    let finalMiddlewareList = [];
    // global middleware
    if (schemaMiddlewareList.global) {
      if (Array.isArray(schemaMiddlewareList.global)) {
        finalMiddlewareList = [...schemaMiddlewareList.global];
      } else if (typeof schemaMiddlewareList.global == "function") {
        finalMiddlewareList.push(schemaMiddlewareList.global);
      }
    }
    if (schemaMiddlewareList[routeObject.name]) {
      if (Array.isArray(schemaMiddlewareList[routeObject.name])) {
        finalMiddlewareList = [
          ...finalMiddlewareList,
          ...schemaMiddlewareList[routeObject.name]
        ];
      } else if (typeof schemaMiddlewareList[routeObject.name] == "function") {
        finalMiddlewareList.push(schemaMiddlewareList[routeObject.name]);
      }
    }
    return finalMiddlewareList;
  }
};
