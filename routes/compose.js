var express = require('express');
var router = express.Router();
var Item = require('../models/Item');

/* GET Page for composing a menu: seller choosing */
router.get('/', async (req, res, next) => {

  if(req.isAuthenticated())
    res.render('logged_in/compose',{
      //Avaliable sellers
      sellers: await Item.distinct('seller')
    });
  else
    res.redirect('/login?failed=false');
});

/* GET Page for composing a menu: items choosing */
router.get('/seller/:seller', async (req, res, next) => {

  if(req.isAuthenticated())
    res.render('logged_in/compose',{

      //Avaliable items labeled as 'primo'
      primi: await Item.find({ 
        seller: req.params.seller, 
        type: 'primo'
      }),

      //Avaliable items labeled as 'secondo'
      secondi: await Item.find({ 
        seller: req.params.seller, 
        type: 'secondo'
      }),

      //Avaliable items labeled as 'contorno'
      contorni: await Item.find({ 
        seller: req.params.seller, 
        type: 'contorno'
      }),

      //Avaliable items labeled as 'bibita'
      bibite: await Item.find({ 
        seller: req.params.seller,
        type: 'bibita'
      })

    });
  else
    res.redirect('/login?failed=false');
});

/* GET Page for paying the composed menu. */
router.get('/pay', function(req, res, next) {
  res.render('logged_in/pay');
});

module.exports = router;
