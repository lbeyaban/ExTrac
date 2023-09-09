var express = require('express');
var router = express.Router();
const passport = require('passport')

const controller = require('../controller')



/* GET users listing. */
router.get('/',  function (req, res, next) {

  res.render('admin/index', {

    title: "Admin Sayfasi"

  })

});


router.get('/ogrenci-listesi',  function (req, res, next) {

  res.render('admin/ogrenciler', {

    title: "Öğrenci Listesi"

  })

});

router.get('/ders-listesi',  function (req, res, next) {

  res.render('admin/dersler', {

    title: "Ders Listesi"

  })

});






module.exports = router;
