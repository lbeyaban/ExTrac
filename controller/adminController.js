let adminController = {}
const { Long } = require('mongodb')
const services = require('../services')
const helper = require('../helper')



adminController.dersEkle = async function (req, res , next) {

    console.log("Req Body : " , req.body);


    let rs = await services.adminService.dersEkle(req.body.dersAdi, req.body.dersAciklamasi, req.body.dersiAlabilenSiniflar , req.body.konular)

    if(rs.error){

        req.flash("flashError" , rs.message)
        res.redirect('/admin/ders-listesi')

    } else {

        req.flash("flashSuccess" , "Ders Ekleme Basarili")
        res.redirect('/admin/ders-listesi')

    }

}

adminController.ogretmenEkle = async function (req, res , next) {

    console.log("Pdf : " , req.body.diploma);

    let rs = await services.adminService.ogretmenEkle(req.body.adSoyad, req.body.email, req.body.gsm, req.body.verdigiDersler, req.body.sozlesmeBaslangic, req.body.sozlesmeBitis, req.body.diploma, req.body.cinsiyet)

    if(rs.error){

        req.flash("flashError" , rs.message)
        res.redirect('/admin/ogretmen-ekle')

    } else {

        req.flash("flashSuccess" , rs.message)
        res.redirect('/admin/ogretmen-ekle')

    }

}

adminController.getOgretmenEkle = async(req,res,next) => {

    let dersler = await helper.mongoHelper.getByCollection("Quiz", "Lessons")

    if(dersler) {

        res.render('admin/ogretmen-ekle', {

            title: "Ogretmen Ekleme Sayfasi",
            dersler: dersler
        
        })

    } else {

        req.flash("flashError" , "Bir Aksilik Yaşandı Lütfen Tekrar Deneyiniz. Yoksa Yöneticiye Ulaşınız.")
        res.redirect('/admin')

    }


}


adminController.getKonuEkle = async(req,res,next) => {

    let dersler = await helper.mongoHelper.getByCollection("Quiz", "Lessons")

    if(dersler) {

        res.render('admin/konu-ekle', {

            title: "Konu Ekleme Sayfasi",
            dersler: dersler
        
        })

    } else {

        req.flash("flashError" , "Bir Aksilik Yaşandı Lütfen Tekrar Deneyiniz. Yoksa Yöneticiye Ulaşınız.")
        res.redirect('/admin')

    }


}


adminController.dersListesi = async function (req, res , next) {
    

    let rs = await helper.mongoHelper.getByCollection("Quiz" , "Lessons")

    console.log("Rs : " , rs);
    
    if(rs.error){

        req.flash("flashSuccess" , "Ders Listesi Getirilemedi")
        res.redirect('/admin')
        

    } else {

        res.render('admin/dersler', {

            title: "Ders Listesi",
            dersler : rs
        
        })

    }

}

adminController.konuEkle = async function (req, res , next) {



    let rs = await services.adminService.konuEkle(req.body.dersler , req.body.konular)

    if(rs.error){

        req.flash("flashError" , rs.message)
        res.redirect('/admin/konu-ekle')

    } else {

        req.flash("flashSuccess" , rs.message)
        res.redirect('/admin/konu-ekle')

    }

}


module.exports = adminController