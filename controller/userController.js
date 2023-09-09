let userController = {}
const { resource } = require('../app')
const services = require('../services')



userController.register = async function (req, res , next) {

    let rs = await services.userService.register(req.body.nameSurname, req.body.email, req.body.password, req.body.sinif)

    req.flash("flashSuccess" , "Islem Basarili")

    res.redirect('/')

}

module.exports = userController