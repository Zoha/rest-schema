module.exports = async (req, res, middlewareList) => {
  const middlewares = middlewareList.flat(8)
  let error = null
  for (let middleware of middlewares) {
    await new Promise((resolve, reject) => {
      const callback = err => {
        if (err) {
          error = err
          resolve()
        } else {
          resolve()
        }
      }
      if (error) {
        if (middleware.length === 4) {
          middleware(error, req, res, err => {
            error = null
            callback(err)
          })
        } else {
          reject(error)
        }
      } else if (middleware.length !== 4) {
        middleware(req, res, callback)
      } else {
        resolve()
      }
    })
  }
  if (error) {
    throw error
  }
  return true
}
