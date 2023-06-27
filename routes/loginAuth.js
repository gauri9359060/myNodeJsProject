const express = require('express');
const router = express.Router();
const authControllerLogin = require('../controllers/userController');
const { userLoginAuth } = require('../middlewares/userLoginAuth');

router.post("/login", authControllerLogin.login);


module.exports = router;