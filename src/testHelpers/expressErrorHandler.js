module.exports = (error, req, res, next) => {
  console.info(error)
  res.status(500).json(error)
  next()
}
