var createError = require('http-errors');
var express = require('express');
var router = express.Router();

/* Login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

/* GET login by selected method. */
router.get('/:method', function(req, res, next) {
  
  if(req.params.method === "google")
  {
      res.send("<h1 style=\"position:center;\">Google login</h1>");
      //Handle google login
  }
  else
    next(createError(404));

});

module.exports = router;
