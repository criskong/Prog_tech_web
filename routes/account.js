var express = require('express');
const passport = require('passport');
var router = express.Router();
var Account = require('../models/Account');

/* GET Account page. */
router.get('/', async (req, res, next) => {
  
  if(req.isAuthenticated())
  {
    //Getting the info of the account related to the session
    var aqres = await Account.findById(req.session.passport.user);

    //TODO: getting all the orders associated with the account

    //Rendering the page with the required parameters
    res.render('logged_in/account', { 
      account: aqres,
      orders:[{}]
    });

  }
  else
    res.redirect('/login?failed=false');
});

/* GET Logout. */
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    
    if (err) 
      return next(err); 
    else
      res.redirect('/');
  });

});

module.exports = router;
