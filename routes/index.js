const router = require('express').Router();

const userRouter = require('./users');
const articleRouter = require('./articles');
const auth = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');
const { validateUserBody, validateUserCredentials } = require('../middlewares/validation');

const NotFoundError = require('../errors/not-found-err');

router.use('/articles', auth, articleRouter);
router.use('/users', auth, userRouter);

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateUserCredentials, login);
router.use('/signout', auth, logout);

router.use((req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

module.exports = router;
