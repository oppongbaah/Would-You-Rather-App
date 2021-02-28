const express = require('express');
const path = require('path');
const router = express.Router();
const globalCtrl = require('../../controllers/global');
const zip = require('../authed/zip');

/* GET root route. */
router.get('/', (req, res, next) => {
  //  react build integration
  console.log(path.join(__dirname, '../../build'))
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

module.exports = router;
