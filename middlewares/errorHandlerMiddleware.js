const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({
    message: 'something went wrong'
  })
}

module.exports = errorHandlerMiddleware
