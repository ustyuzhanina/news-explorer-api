const jwt = require('jsonwebtoken');
const devSecret = require('../configs/key-config');
const { authErr } = require('../configs/error-msg');
const AuthorizationError = require('../errors/signin-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthorizationError(authErr.authRequired);
  }

  let payload;

  const { NODE_ENV, JWT_SECRET } = process.env;
  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : devSecret);
  } catch (err) {
    throw new AuthorizationError(authErr.authRequired);
  }

  req.user = payload;

  next();
};
