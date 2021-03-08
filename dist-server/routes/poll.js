"use strict";

var express = require('express');

var router = express.Router();

var seedCtrl = require('../../controllers/Seed');

var pollsCtrl = require('../../controllers/Polls');

router.get('/fetch-all', function (req, res, next) {
  seedCtrl.polls();
  pollsCtrl.fetchAll(req, res);
});
router.get('/fetch/:_id', function (req, res, next) {
  pollsCtrl.fetchOne(req, res);
});
router.post('/add', function (req, res, next) {
  pollsCtrl.addQuestion(req, res);
});
router["delete"]('/remove/:_id', function (req, res, next) {
  pollsCtrl.removeQuestion(req, res);
});
router.put('/vote/:pid/:uid', function (req, res, next) {
  pollsCtrl.saveVote(req, res);
});
module.exports = router;