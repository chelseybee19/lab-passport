const express        = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// Require user model

router.get('/signup', (req, res, next) => {
  res.render('views/passport/signup.hbs')
})

// Add bcrypt to encrypt passwords

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
  res.render('views/passport/login.hbs', {message: req.flash('error')})
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

// Add passport 


const ensureLogin = require("connect-ensure-login");


router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});

module.exports = router;
