const errorMiddleware = (err, req, res, next) => {
  const { message, status } = err;
  return res.status(status || 500).send(message);
};

module.exports = errorMiddleware;
