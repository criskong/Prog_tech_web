var express = require('express');
var router = express.Router();
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

//Passport setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/login/google/callback',
  scope: [ 'profile' ]
},
function(accessToken, refreshToken, profile, cb) 
{
  console.log(profile);//Account database handling

  cb(null,profile);
}));

passport.serializeUser((user,done) => { done(null,user.id)});
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
