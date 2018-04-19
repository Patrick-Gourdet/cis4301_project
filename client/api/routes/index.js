var express = require('express');
var router = express.Router();

var userCtrl = require('../controllers/users.controller.js');
var kickCtrl = require('../controllers/kickstarter.controller.js');
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
  .route('/profile-signin')
  .post(userCtrl.userAuth);

router
  .route('/user-profile')
  .patch(userCtrl.getUser);

router
  .route('/add-profile')
  .post(userCtrl.userRegister);
router
  .route('/kickstarter-projects')
  .get(kickCtrl.KSprojects);

module.exports = router;
