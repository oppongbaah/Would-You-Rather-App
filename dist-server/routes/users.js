"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../authed/auth');

var zip = require('../authed/zip'); // import controllers


var usersCtrl = require('../../controllers/Users');
/* GET users listing. */


router.get('/', function (req, res, next) {
  res.send('users');
});
router.post('/signup', function (req, res, next) {
  if (!req.body.username) {
    res.send("username is required");
  } else if (!req.body.password) {
    res.send("password is required");
  } else {
    usersCtrl.save(req, res);
  }
}); // login route

router.use('/login', function (req, res) {
  if (!req.cookies.authedUser) {
    // Authorise user if the user has not been authorised from the front end
    if (!req.headers.authorization) {
      res.setHeader("WWW-Authenticate", "Basic");
      res.status(401).send("Login to proceed");
      return;
    } // authorise the user after setting the authorisation header
    else {
        auth.authed(req, res);
      }
  } else {
    // Cookie exit: user already signed in: decrpyt cookie
    var decryptedCookie = zip.decrypt(req.cookies.authedUser);
    var authedDetails = req.headers.authorization; //Extracting username:password from the encoding Authorization: Basic username:password

    var bufferedData = new Buffer.from(authedDetails.split(" ")[1], 'base64');
    var userId = bufferedData.toString().split(":")[0];

    if (decryptedCookie == userId) {
      res.send("Already signed in. Ready to go!");
    } else {
      //Wrong info, user asked to authenticate again by setting the header authomatically
      res.setHeader("WWW-Authenticate", "Basic");
      res.status(401).send("Unauthorise: Logged in by another user");
    }
  }
});
router.use('/logout', function (req, res) {
  if (!req.cookies.authedUser) {
    res.send("Guest user cannot log out. Kindly sign up first");
  } else {
    res.clearCookie("authedUser");
    res.send("Logged out successful");
  }
});
router.get('/fetch-all', function (req, res, next) {
  if (!req.cookies.authedUser) {
    res.redirect("/users/login");
  } else {
    usersCtrl.fetchAll(req, res);
  }
});
router.get('/fetch/:_id', function (req, res, next) {
  if (!req.cookies.authedUser) {
    res.redirect("/users/login");
  } else {
    usersCtrl.fetchOne(req, res);
  }
});
module.exports = router;