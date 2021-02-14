const { MongoError } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { devSecret } = require('../configs/key-config');
const User = require('../models/user');
const {
  mongoErr,
  notFoundError,
  badReqErr,
  authErr,
} = require('../configs/error-msg');
const BadRequestError = require('../errors/bad-request-err');
const AuthorizationError = require('../errors/signin-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getUserData = (req, res, next) => {
  const me = req.user._id;

  User.findOne({ _id: me })
    .then((user) => {
      if (user) {
        res.send({
          email: user.email,
          name: user.name,
        });
      } else {
        throw new NotFoundError(notFoundError.user);
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (!password || !password.trim()) {
    throw new BadRequestError(badReqErr.noPassword);
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }

      if (err instanceof MongoError && err.code === 11000) {
        return res.status(409).json({
          type: 'MongoError',
          message: mongoErr.usedEmailErr,
        });
      }

      if (err instanceof MongoError && err.code !== 11000) {
        return res.status(503).json({
          type: 'MongoError',
          message: err.message,
        });
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError(authErr.invalidCreds));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationError(authErr.invalidCreds));
          }

          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : devSecret,
            { expiresIn: '7d' },
          );

          res.cookie('jwt', token, {
            maxAge: 3600 * 24 * 7 * 1000,
            httpOnly: true,
            sameSite: true,
            // secure: true,
          });
          return res.send({ message: token });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }

      if (err instanceof MongoError && err.code !== 11000) {
        return res.status(503).json({
          type: 'MongoError',
          message: err.message,
        });
      }

      return next(err);
    });
};

module.exports.logout = (req, res) => {
  res
    .clearCookie('jwt')
    .status(200).send({ message: 'Вы вышли вышли из системы!' });
};
