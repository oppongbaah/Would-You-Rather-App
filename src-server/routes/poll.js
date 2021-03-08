const express = require('express');
const router = express.Router();
const seedCtrl = require('../../controllers/Seed');
const pollsCtrl = require('../../controllers/Polls');

router.get('/fetch-all', (req, res, next) => {
    seedCtrl.polls();
    pollsCtrl.fetchAll(req, res);
})

router.get('/fetch/:_id', (req, res, next) => {
    pollsCtrl.fetchOne(req, res);
})

router.post('/add', (req, res, next) => {
    pollsCtrl.addQuestion(req, res);
})

router.delete('/remove/:_id', (req, res, next) => {
    pollsCtrl.removeQuestion(req, res);
})

router.put('/vote/:pid/:uid', (req, res, next) => {
    pollsCtrl.saveVote(req, res);
})

module.exports = router;
