const passport = require('passport');
const VKStrategy = require('passport-vkontakte').Strategy;
const keys = require('./keys.js');
const { Pacients } = require('../models/models')

passport.serializeUser((pacient, done) => {
  done(null, pacient.pacient_id);
});

// puts pacient object into req.user
passport.deserializeUser(async (pacient_id, done) => {
  try {
    let pacient = await Pacients.findOne({ where: { pacient_id } });
    if (pacient) {
      done(null, pacient);
    } else {
      done(null, null)
    }
  } catch (err) {
    done(null, null);
  }
});

passport.use(
  new VKStrategy(
    {
      clientID: keys.vk.clientID,
      clientSecret: keys.vk.clientSecret,
      callbackURL: "/api/pacient/redirect",
      profileFields: ["id", "first_name", "last_name"],
      lang: "ru"
    }, async (req, accessToken, refreshToken, params, profile, done) => {
      let pacient = await Pacients.findOne({ where: { pacient_id: profile._json.id } });
      if (!pacient) {
        pacient = await Pacients.create({ 
          pacient_id: profile._json.id, 
          first_name: profile._json.first_name, 
          last_name: profile._json.last_name
        })
      }
      done(null, pacient);
    }
  )
); 