var express = require('express');
var router = express.Router();
const passport = require('passport')
const controller = require('../controller')

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/')
  }
  next()
}

/* GET users listing. */
router.get('/login', checkNotAuthenticated, function (req, res, next) {

  res.render('login', {
    title: "Login Sayfasi"
  })
  
});

router.get('/register', checkNotAuthenticated, function (req, res, next) {

  res.render('register', {
    title: "Register Sayfasi"
  })
  
});


router.get('/logout', checkNotAuthenticated, function (req, res, next) {

  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/users/login')

  });

});

// POST users listing
router.post('/register', checkNotAuthenticated, async function (req, res, next) {

  await controller.userController.register(req, res, next);

});

router.post('/login', checkNotAuthenticated,  passport.authenticate('local', {

  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash : true

}))




module.exports = router;
