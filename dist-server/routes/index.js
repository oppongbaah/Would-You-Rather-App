"use strict";

var express = require('express');

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
  // get the username using the decrypted authedUser which is the userId
  var decryptedCookie = zip.decrypt(req.cookies.authedUser);
  globalCtrl.getUsername(decryptedCookie).then(function (data) {
    var name = data[0].username;
    res.send("Welcome ".concat(name, ". Great to have you here"));
  })["catch"](function (err) {
    res.send("Username could not be retrieved");
  });
});
module.exports = router;