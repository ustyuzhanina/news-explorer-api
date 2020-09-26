const notFoundError = {
  user: 'Нет пользователя с таким id',
  article: 'В базе данных еще нет ни одной новости',
};

const badReqErr = {
  noPassword: 'Введите пароль',
  wrongUrl: 'Неправильный URL',
};

const authErr = {
  invalidCreds: 'Неправильные почта или пароль',
  authRequired: 'Необходима авторизация',
};

const forbidden = {
  deleteArticle: 'Запрещено',
};

module.exports = {
  notFoundError,
  badReqErr,
  authErr,
  forbidden,
};
