const notFoundError = {
  user: 'Нет пользователя с таким id',
  article: 'В базе данных еще нет ни одной новости',
  articleId: 'В базе данных нет такой новости',
};

const badReqErr = {
  noPassword: 'Введите пароль',
  wrongUrl: 'Неправильный URL',
};

const authErr = {
  invalidCreds: 'Неправильная почта или пароль',
  authRequired: 'Необходима авторизация',
};

const forbidden = {
  deleteArticle: 'Запрещено',
};

const mongoErr = {
  usedEmailErr: 'Пользователь с таким адресом электронной почты уже существует',
};

const serverErr = 'На сервере произошла ошибка';

module.exports = {
  notFoundError,
  badReqErr,
  authErr,
  forbidden,
  serverErr,
  mongoErr,
};
