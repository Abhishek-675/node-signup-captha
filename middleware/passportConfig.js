const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require('passport');

const User = require("../models/User");

// exports.initializingPassport = async (passport)=>{
  passport.use(
    new LocalStrategy({usernameField: 'email', passReqToCallback: true}, async function (req, email, password, done) {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, {message: 'Incorrect Email'}); //Incorrect Email
        }
        else{
          const response = bcrypt.compareSync(password, user.password)
          if(response) 
              return done(null, user);
          else 
              return done(null, false, {message: 'Incorrect Password'}) //Incorrect Password
        }
      } catch (err) {
        return done(err);
      }
    })
  );
  
  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });
  
  passport.deserializeUser(async (email, done) => {
    const user = await User.findOne({ where: { email } });
    if(!user)
    {
         done(error, false);
    }
        done(null, user);
    }
  );
// }

module.exports = passport;