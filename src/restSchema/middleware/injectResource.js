module.exports = async (req, res, next) => {
  try {
    req.rest.resource = await req.rest.getResource();
    next();
  } catch (e) {
    next(e);
  }
};
