module.exports = context => {
  const schemaMiddlewareList = context.schema.middleware;

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
    if (schemaMiddlewareList[context.route]) {
      if (Array.isArray(schemaMiddlewareList[context.route])) {
        finalMiddlewareList = [
          ...finalMiddlewareList,
          ...schemaMiddlewareList[context.route]
        ];
      } else if (typeof schemaMiddlewareList[context.route] == "function") {
        finalMiddlewareList.push(schemaMiddlewareList[context.route]);
      }
    }
    return finalMiddlewareList;
  }
};
