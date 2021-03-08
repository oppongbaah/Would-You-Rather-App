"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../authed/auth');

var zip = require('../authed/zip');

var cors = require('cors'); // import controllers


var usersCtrl = require('../../controllers/Users');

var seedCtrl = require('../../controllers/Seed');

router.post('/signup', function (req, res, next) {
  if (!req.body.username) {
    console.log(req.body);
    res.send("username is required");
  } else if (!req.body.password) {
    res.send("password is required");
  } else {
    usersCtrl.save(req, res);
  }
}); // login route

router.use('/login', cors(), function (req, res) {
  // Authorise user if the user has not been authorised from the front end
  if (!req.headers.authorization) {
    res.setHeader("WWW-Authenticate", "Basic");
    res.status(401).json({
      message: "You are not authorised to visit this page. Contact your administrator",
      status: 401
    });
    return;
  } // authorise the user after setting the authorisation header
  else {
      auth.authed(req, res);
    }
});
router.get('/fetch-all', function (req, res, next) {
  seedCtrl.users();
  usersCtrl.fetchAll(req, res);
});
router.get('/fetch/:_id', function (req, res, next) {
  usersCtrl.fetchOne(req, res);
});
module.exports = router;