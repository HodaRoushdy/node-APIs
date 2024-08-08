const express = require('express');
const { Login, Refresh, Logout } = require('../controllers/userControllers');
// const jwt = require('jsonwebtoken');

const router = express.Router();

router.route('/').post(Login)
router.route('/refresh').get(Refresh)
router.route('/logout').get(Logout)

    
module.exports = router