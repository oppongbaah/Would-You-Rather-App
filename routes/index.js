const express = require('express');
const router = express.Router();
const seed = require('../controllers/seed');
const globalCtrl = require('../controllers/global');
const zip = require('../authed/zip');

/* GET root route. */
router.get('/', (req, res, next) => {
  if (!req.cookies.authedUser){
    res.redirect('/users/login');
  }
  else {
    seed.users();
    next();
  }
});

/* GET root route. */
router.get('/', (req, res, next) => {
  // get the username using the decrypted authedUser which is the userId
  let decryptedCookie = zip.decrypt(req.cookies.authedUser);
  globalCtrl.getUsername(decryptedCookie)
  .then(data => {
    const name = data[0].username;
    res.send(`Welcome ${name}. Great to have you here`)
  })
  .catch((err) => {res.send("Username could not be retrieved")})
});

module.exports = router;
