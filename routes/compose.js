var express = require('express');
var router = express.Router();

/* GET Page for composing a menu. */
router.get('/', function(req, res, next) {
  res.render('logged_in/compose');
});

/* GET Page for paying the composed menu. */
router.get('/pay', function(req, res, next) {
  res.render('logged_in/pay');
});

module.exports = router;
