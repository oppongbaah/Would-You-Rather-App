const express = require('express');
const router = express.Router();
const seed = require('../controllers/seed');

/* GET root route. */
router.get('/', (req, res, next) => {
  seed.users();
  next();
});

/* GET root route. */
router.get('/', (req, res, next) => {
  res.send("Welcome. Great to have you here!");
});

module.exports = router;
