const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const helper = require('./helper')
const {
  ObjectId,
  Long
} = require('mongodb')

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {

    const user = await helper.mongoHelper.getDataByField('email', email, 'Quiz', 'Users')

    if (!user) {
      return done(null, false, {
        message: 'E-maile Kayitli Kullanici Bulunamadi'
      })
    }

    try {
      const passwordMatch = await bcrypt.compare(password, user.sifre);
      if (passwordMatch) {

        return done(null, user)

      } else {
        return done(null, false, {
          message: 'Girilen Sifre Yanlis'
        })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser(async (id, done) => {
    return done(null, await helper.mongoHelper.getDataByField('_id', new ObjectId(id), 'Quiz', 'Users'))
  })
}

module.exports = initialize