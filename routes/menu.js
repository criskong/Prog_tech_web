var express = require('express');
var router = express.Router();

/* GET Page that lists all avaliable menus. */
router.get('/', function(req, res, next) {
  res.render('menu');
});

module.exports = router;
