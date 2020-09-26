const { Joi, celebrate } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const validator = require('validator');
const { badReqErr } = require('../configs/error-msg');

const BadRequestError = require('../errors/bad-request-err');

const urlValidator = (link) => {
  if (!validator.isURL(link)) {
    throw new BadRequestError(badReqErr.wrongUrl);
  }
  return link;
};

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2 символа',
        'string.max': 'Максимальная длина поля "name" - 30 символов',
        'any.required': 'Заполните поле "name"',
        'string.empty': 'Поле "name" не должно быть пустым',
        'string.base': 'Поле "name" должно содержать текстовые данные',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Введите валидный "email"',
        'any.required': 'Заполните поле "email"',
        'string.empty': 'Поле "email" не должно быть пустым',
        'string.base': 'Поле "email" должно содержать текстовые данные',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля "password" - {#limit} символов',
        'any.required': 'Заполните поле "password"',
        'string.empty': 'Поле "password" не должно быть пустым',
        'string.base': 'Поле "password" должно содержать текстовые данные',
      }),
  }),
});

const validateUserCredentials = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Введите валидный "email"',
        'any.required': 'Заполните поле "email"',
        'string.empty': 'Поле "email" не должно быть пустым',
        'string.base': 'Поле "email" должно содержать текстовые данные',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля "password" - {#limit} символов',
        'any.required': 'Заполните поле "password"',
        'string.empty': 'Поле "password" не должно быть пустым',
        'string.base': 'Поле "password" должно содержать текстовые данные',
      }),
  }),
});

const checkArticleReqHeaders = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(true),
});

const checkArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'any.required': 'Заполните поле "keyword"',
        'string.empty': 'Поле "keyword" не должно быть пустым',
        'string.base': 'Поле "keyword" должно содержать текстовые данные',
      }),
    title: Joi.string().required()
      .messages({
        'any.required': 'Заполните поле "title"',
        'string.empty': 'Поле "title" не должно быть пустым',
        'string.base': 'Поле "title" должно содержать текстовые данные',
      }),
    text: Joi.string().required()
      .messages({
        'any.required': 'Заполните поле "text"',
        'string.empty': 'Поле "text" не должно быть пустым',
        'string.base': 'Поле "text" должно содержать текстовые данные',
      }),
    date: Joi.string().required()
      .messages({
        'any.required': 'Заполните поле "date"',
        'string.empty': 'Поле "date" не должно быть пустым',
        'string.base': 'Поле "date" должно содержать текстовые данные',
      }),
    source: Joi.string().required()
      .messages({
        'any.required': 'Заполните поле "source"',
        'string.empty': 'Поле "source" не должно быть пустым',
        'string.base': 'Поле "source" должно содержать текстовые данные',
      }),
    link: Joi.string().required().custom(urlValidator)
      .messages({
        'any.required': 'Заполните поле "link"',
        'string.empty': 'Поле "link" не должно быть пустым',
        'string.base': 'Поле "link" должно содержать текстовые данные',
      }),
    image: Joi.string().required().custom(urlValidator)
      .messages({
        'any.required': 'Заполните поле "image"',
        'string.empty': 'Поле "image" не должно быть пустым',
        'string.base': 'Поле "image" должно содержать текстовые данные',
      }),
  }),
});

const checkArticleParams = celebrate({
  params: Joi.object().keys({
    articleId: Joi.objectId().required(),
  }),
});

const checkGetMeReqHeaders = celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(true),
});

module.exports = {
  validateUserBody,
  validateUserCredentials,
  checkArticleReqHeaders,
  checkArticleBody,
  checkArticleParams,
  checkGetMeReqHeaders,
};
