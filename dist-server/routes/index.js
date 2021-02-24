"use strict";

var express = require('express');

var path = require('path');

var router = express.Router();

var seed = require('../../controllers/seed');

var globalCtrl = require('../../controllers/global');

var zip = require('../authed/zip');
/* GET root route. */


router.get('/', function (req, res, next) {
  if (!req.cookies.authedUser) {
    res.redirect('/users/login');
  } else {
    seed.users();
    next();
  }
});
/* GET root route. */

router.get('/', function (req, res, next) {
  //  react build integration
  res.sendFile(path.join(__dirname, 'build', 'index.html')); // // get the username using the decrypted authedUser which is the userId
  // let decryptedCookie = zip.decrypt(req.cookies.authedUser);
  // globalCtrl.getUsername(decryptedCookie)
  // .then(data => {
  //   const name = data[0].username;
  //   res.send(`Welcome ${name}. Great to have you here`)
  // })
  // .catch((err) => {res.send("Username could not be retrieved")})
});
module.exports = router;