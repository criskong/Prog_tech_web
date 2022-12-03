var express = require('express');
var router = express.Router();
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var Account = require('../models/Account');

//Passport setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/login/google/callback',
  scope: [ 'profile' ]
},
async (accessToken, refreshToken, profile, cb) => {

  //Getting account info for verifying its existence
  var user = await Account.findOne({
    id: profile.id,
    provider: 'google'
  });

  //Creating the user if not yet registered
  if(!user)
  {
    user = await Account.create({
      id: profile.id,
      provider: profile.provider,
      name: profile.name.givenName,
      surname: profile.name.familyName,
      profile_picture: profile.photos[0].value
    });
  }

  cb(null,user);
}));

passport.serializeUser((user,done) => { done(null,user._id)});
passport.deserializeUser((userId,done) => { done(null,userId)});

/* GET Login page. */
router.get('/', function(req, res, next) {
  res.render('login', { failed: req.query.failed });
});

/* GET Google OAuth handling. */
router.get('/google', passport.authenticate('google'));

/* GET Google OAuth handling. */
router.get('/google/callback', passport.authenticate('google', {
  successReturnToOrRedirect: '/account',
  failureRedirect: '/login?failed=true'
}));

module.exports = router;
