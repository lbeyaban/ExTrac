var express = require('express');
var router = express.Router();

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/users/login')
  
}

/* GET index page. */
router.get('/', checkAuthenticated , function(req, res, next) {

    res.render('index', { title: 'Ana Sayfa' , name : req.user.ad });

});


module.exports = router;
