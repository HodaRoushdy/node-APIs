const express = require('express');
const { Login, Refresh } = require('../controllers/userControllers');
// const jwt = require('jsonwebtoken');

const router = express.Router();
// const secretKey = 'secret_key';
//         const authenticate = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) {
//     return res.status(401).send('Access Denied. No token provided.');
//   }

//   try {
//     const decoded = jwt.verify(token, secretKey);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(400).send('Invalid Token.');
//   }
// };

// router.route('/auth').get(authenticate,Login)
router.route('/').post(Login)
// router.route('/refresh').get(Refresh)
    
module.exports = router