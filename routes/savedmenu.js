var express = require('express');
var router = express.Router();
var SavedMenu = require('../models/SavedMenu');
const ejs = require('ejs');

/* GET saved menus page. */
router.get('/', async (req, res, next) => {

  if(req.isAuthenticated())
  {
    res.send(await ejs.renderFile('./views/logged_in/savedmenu.ejs',{

      //Saved menus related to the account
      savedmenus: await SavedMenu.find({ owner_id: req.session.passport.user }),

    },{async: true}));
  }
  else
    res.redirect('/login?failed=false');
});

/* GET pay page for saved menus. */
router.get('/pay', function(req, res, next) {
  res.render('logged_in/pay');
});

module.exports = router;
