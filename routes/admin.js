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

router.get('/ogretmen-ekle', async function (req, res, next) {

  await controller.adminController.getOgretmenEkle(req, res, next)

});

router.get('/konu-ekle', async function (req, res, next) {

  await controller.adminController.getKonuEkle(req, res, next)

});



/* POST users listing. */

router.post('/ders-ekle', async function (req, res, next) {

  await controller.adminController.dersEkle(req, res, next)

});


router.post('/ogretmen-ekle', async function (req, res, next) {

  await controller.adminController.ogretmenEkle(req, res, next)

});

router.post('/konu-ekle', async function (req, res, next) {

  await controller.adminController.konuEkle(req, res, next)

});



module.exports = router;