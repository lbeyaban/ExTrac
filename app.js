var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash')
const flash1 = require('express-flash')
const session = require('express-session')
const passport = require('passport')
var app = express();
const initializePassport = require('./passport-config')
initializePassport(passport  )

//Flash middlewares
app.use(cookieParser("SECRET"))
app.use(session({
  cookie : {maxAge : 6000},
  resave : true,
  secret : "SECRET",
  saveUninitialized : true
}))
app.use(flash())
app.use(flash1())



//Passport 
app.use(passport.initialize())
app.use(passport.session())


//Yönlerdirme mesajlarını localde tutmak için
app.use((req,res,next) => {

  res.locals.flashSuccess = req.flash("flashSuccess")
  res.locals.flashError = req.flash("flashError")
  next()

})


//Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',  indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

function checkAuthenticated(req, res, next) {

  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/users/login')

}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
