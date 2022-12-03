var express = require('express');
var router = express.Router();

/* GET Account page. */
router.get('/', function(req, res, next) {
  
  if(req.isAuthenticated())
    res.render('logged_in/account');
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
