const express        = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");// Add bcrypt to encrypt passwords
const ensureLogin = require("connect-ensure-login");
// Require user model
const User = require("../models/user")
// Add passport 
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

router.get('/signup', (req, res, next) => {
  res.render('passport/signup.hbs')
})

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body

  bcrypt.hash(password, 10)
    .then(hash => {
      return User.create({
        username: username,
        password: hash
      })
      .then(user => {
        res.send(user)
      })
    })
})

router.get('/login', (req, res, next) => {
  res.render('passport/login.hbs', {message: req.flash('error')})
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});

module.exports = router;