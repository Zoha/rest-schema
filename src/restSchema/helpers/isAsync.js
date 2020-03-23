module.exports = res => {
  return res && res.constructor && res.constructor.name === "AsyncFunction"
}
