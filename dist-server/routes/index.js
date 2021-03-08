"use strict";

var express = require('express');

var path = require('path');

var router = express.Router();

var globalCtrl = require('../../controllers/global');

var zip = require('../authed/zip');
/* GET root route. */


router.get('/', function (req, res, next) {
  //  react build integration
  console.log(path.join(__dirname, '../../build'));
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});
module.exports = router;