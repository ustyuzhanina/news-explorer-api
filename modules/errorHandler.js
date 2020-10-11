const { serverErr } = require('../configs/error-msg');

module.exports.errorHandler = (error, req, res, next) => {
  const { statusCode = 500, message } = error;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? serverErr
        : message,
    });

  return next();
};
