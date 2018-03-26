var express = require('express');
var router = express.Router();

var userCtrl = require('../controllers/users.controller.js');

/* GET home page. */
router
  .route('/home')
  .get(function(req, res, next) {
  res.json({message: 'You are home' });
});

router
.route('/profiles')
.get(userCtrl.usersGetAll);

router
.route('/profiles/:USER_NAME')
.get(userCtrl.usersGetOne);

module.exports = router;
