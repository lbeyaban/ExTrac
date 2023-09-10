let adminController = {}
const { Long } = require('mongodb')
const services = require('../services')
const helper = require('../helper')



adminController.dersEkle = async function (req, res , next) {

    let rs = await services.adminService.dersEkle(req.body.dersAdi, req.body.dersAciklamasi, req.body.dersiAlabilenSiniflar)

    console.log("rs : " , rs);


    if(rs.error){

        req.flash("flashError" , rs.message)
        res.redirect('/admin/ders-ekle')

    } else {

        req.flash("flashSuccess" , "Ders Ekleme Basarili")
        res.redirect('/admin/ders-ekle')

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

module.exports = adminController