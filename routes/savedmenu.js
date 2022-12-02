var express = require('express');
var router = express.Router();

/* GET saved menus page. */
router.get('/', function(req, res, next) {

  if(req.isAuthenticated())
    res.render('logged_in/savedmenu');
  else
    res.redirect('/login?failed=false');
});

/* GET pay page for saved menus. */
router.get('/pay', function(req, res, next) {
  res.render('logged_in/pay');
});

module.exports = router;
