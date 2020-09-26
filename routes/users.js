const router = require('express').Router();

const { checkGetMeReqHeaders } = require('../middlewares/validation');
const { getUserData } = require('../controllers/users');

router.get('/me', checkGetMeReqHeaders, getUserData);

module.exports = router;
