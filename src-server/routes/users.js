const express = require('express');
const router = express.Router();
const auth = require('../authed/auth');
const zip = require('../authed/zip');
const cors = require('cors');
// import controllers
const usersCtrl = require('../../controllers/Users');
const seedCtrl = require('../../controllers/Seed');

router.post('/signup', (req, res, next) => {
  if(!req.body.username) {
    console.log(req.body)
    res.send("username is required")
  }
  else if(!req.body.password) {
    res.send("password is required");
  }
  else {
    usersCtrl.save(req, res);
  }
})

// login route
router.use('/login', cors(), (req, res) => {
    // Authorise user if the user has not been authorised from the front end
    if(!req.headers.authorization){
      res.setHeader("WWW-Authenticate", "Basic");
      res.status(401).json({
        message: "Login To Proceed",
        status: 401
      });
      return;
    }
    // authorise the user after setting the authorisation header
    else {
      auth.authed(req, res);
    }
})

router.get('/fetch-all', (req, res, next) => {
    seedCtrl.users();
    usersCtrl.fetchAll(req, res);
})

router.get('/fetch/:_id', (req, res, next) => {
    usersCtrl.fetchOne(req, res);
})

module.exports = router;
