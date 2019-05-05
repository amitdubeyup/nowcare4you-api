const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const UsersGuard = require('../auth/users');

router.post('/login-user', UsersController.loginUser);
router.post('/register-user', UsersController.registerUser);
router.post('/social-login', UsersController.socialLogin);


router.get('/', function(req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !'
    });
});

module.exports = router;