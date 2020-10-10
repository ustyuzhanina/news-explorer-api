const router = require('express').Router();

const { getUserData } = require('../controllers/users');

router.get('/me', getUserData);

module.exports = router;
