module.exports = context => {
  return (req, res, next) => {
    try {
      req.rest = context;
      context.req = req;
      context.res = res;
      next();
    } catch (e) {
      next(e);
    }
  };
};
