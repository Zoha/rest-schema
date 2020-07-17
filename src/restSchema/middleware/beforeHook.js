module.exports = async (req, res, next) => {
  try {
    await req.rest.hook("before")
    return next()
  } catch (e) {
    next(e)
  }
}
