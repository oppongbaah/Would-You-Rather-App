const express = require('express');
const router = express.Router();
const auth = require('../authed/auth');
const zip = require('../authed/zip');
// import controllers
const usersCtrl = require('../../controllers/Users');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('users');
});

router.post('/signup', (req, res, next) => {
  if(!req.body.username) {
    res.send("username is required")
  }
  else if(!req.body.password) {
    res.send("password is required");
  }
  else {
    usersCtrl.save(req, res);
  }
})

// login route
router.use('/login', (req, res) => {
  if (!req.cookies.authedUser) {
    // Authorise user if the user has not been authorised from the front end
    if(!req.headers.authorization){
      res.setHeader("WWW-Authenticate", "Basic");
      res.status(401).send("Login to proceed");
      return;
    }
    // authorise the user after setting the authorisation header
    else {
      auth.authed(req, res);
    }
  }
  else {
    // Cookie exit: user already signed in: decrpyt cookie
    let decryptedCookie = zip.decrypt(req.cookies.authedUser);

    let authedDetails = req.headers.authorization;
    //Extracting username:password from the encoding Authorization: Basic username:password
    const bufferedData = new Buffer.from(authedDetails.split(" ")[1], 'base64');
    const userId = bufferedData.toString().split(":")[0];

    if(decryptedCookie == userId) {
        res.send("Already signed in. Ready to go!");
    }
    else {
        //Wrong info, user asked to authenticate again by setting the header authomatically
        res.setHeader("WWW-Authenticate", "Basic");
        res.status(401).send("Unauthorise: Logged in by another user");
    }
  }
})

router.use('/logout', (req, res) => {
  if(!req.cookies.authedUser){
    res.send("Guest user cannot log out. Kindly sign up first")
  }
  else {
    res.clearCookie("authedUser");
    res.send("Logged out successful")
  }
})

router.get('/fetch-all', (req, res, next) => {
  if (!req.cookies.authedUser){
    res.redirect("/users/login");
  }
  else{
    usersCtrl.fetchAll(req, res);
  }
})

router.get('/fetch/:_id', (req, res, next) => {
  if (!req.cookies.authedUser){
    res.redirect("/users/login");
  }
  else {
    usersCtrl.fetchOne(req, res);
  }
})

module.exports = router;
