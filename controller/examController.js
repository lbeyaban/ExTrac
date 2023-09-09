let examController = {}
const { resource } = require('../app')
const services = require('../services')



examController.addExam = async function (req, res , next) {

    let rs = await services.examService.addExam(req.body.sinavAdi, req.body.sinavAciklama, req.body.sinavSuresi, req.body.sinavZamani, req.body.sinavKonulari, req.body.sinif, req.body.aktif, req.body.dersAdi, req.body.sinavSorulari)

    if(rs.error){

        req.flash("flashError" , "Islem Basarisiz")
        res.redirect('/admin/add-exam')

    } else {

        req.flash("flashSuccess" , "Islem Basarili")
        res.redirect('/admin/examlist')

    }


}

module.exports = examController