module.exports = async (req, res, next) => {
  try {
    await req.rest.hook("afterMiddleware")
    return next()
  } catch (e) {
    next(e)
  }
}
