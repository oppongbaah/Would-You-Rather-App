const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/Users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users');
});

router.post('/signup', function(req, res, next) {
  if(!req.body.username) {
    res.send("username is required")
  }
  else if(!req.body.password) {
    res.send("password is required");
  }
  else {
    usersCtrl.saveUser(req, res);
  }
})

module.exports = router;
