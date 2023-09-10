var express = require('express');
var router = express.Router();
const passport = require('passport')

const controller = require('../controller')



/* GET users listing. */
router.get('/', function (req, res, next) {

  res.render('admin/index', {

    title: "Admin Sayfasi"

  })

});


router.get('/ogrenci-listesi', function (req, res, next) {

  res.render('admin/ogrenciler', {

    title: "Öğrenci Listesi"

  })

});

router.get('/ders-listesi', async function (req, res, next) {

  await controller.adminController.dersListesi(req, res, next)

});

router.get('/ders-ekle', function (req, res, next) {

  res.render('admin/ders-ekle', {

    title: "Ders Ekleme Sayfasi"

  })

});

router.get('/ogretmen-ekle', function (req, res, next) {

  res.render('admin/ogretmen-ekle', {

    title: "Ogretmen Ekleme Sayfasi"

  })

});



/* POST users listing. */

router.post('/ders-ekle', async function (req, res, next) {

  await controller.adminController.dersEkle(req, res, next)

});





module.exports = router;