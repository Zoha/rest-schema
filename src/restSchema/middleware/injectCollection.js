module.exports = async (req, res, next) => {
  try {
    req.rest.resource = await req.rest.getCollection();
    next();
  } catch (e) {
    next(e);
  }
};
