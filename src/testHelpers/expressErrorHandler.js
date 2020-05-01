module.exports = (error, req, res) => {
  console.log(error)
  return res.status(500).json(error)
}
