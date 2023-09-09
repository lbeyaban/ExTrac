let indexController = {}


indexController.getIndexPage = async function (req, res , next) {
    
  res.render('index', { title: 'Index Page' });

}


module.exports = indexController