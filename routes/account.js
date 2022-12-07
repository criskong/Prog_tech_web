var express = require('express');
const passport = require('passport');
var router = express.Router();
var Account = require('../models/Account');
var Order = require('../models/Order');

/* GET Account page. */
router.get('/', async (req, res, next) => {
  
  if(req.isAuthenticated())
  {

    //Rendering the page with the required parameters
    res.render('logged_in/account', {
      
      //Info of the account related to the session
      account: await Account.findById(req.session.passport.user),

      //TODO: Orders associated with the account
      orders: await Order.find({ owner_id: req.session.passport.user })
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
