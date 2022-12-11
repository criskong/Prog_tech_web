var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Order = require('../models/Order');
var SavedMenu = require('../models/SavedMenu');
var QR = require('qrcode');

/* GET Order details page */
router.get('/:orderId([0-9a-fA-F]{24})', async (req, res, next) => {
    
    //Getting order info
    var order = await Order.findById(req.params.orderId);

    if(req.isAuthenticated())
    {
        //Rendering the page with the required parameters
        res.render('logged_in/order', {
            //Info of the requested order
            order: order,

            //Generated QR code
            qr: await QR.toDataURL(req.params.orderId,{width: 256})

        });
    }
    else
        res.redirect('/login?failed=false');
});

/* Get Deletes an order */
router.get('/:orderId([0-9a-fA-F]{24})/delete', async (req, res, next) => {

    var order = await Order.findById(req.params.orderId);
  
    if(order)
    {
      if(order.status === 'non pagato')
      {
        Order.deleteOne({ _id: order._id},function (err,order){
          if(err)
            next(createError(500));
          else
            res.redirect('/account');
        });
      }
      else
        next(createError(405));
    }
    else
      next(createError(405));
  
});

/* GET Creates a saved menu from a list of items ID  */
router.get('/:orderId/savedmenu', async (req, res, next) => {

  //Getting the order details
  var order = await Order.findById(req.params.orderId);

  //Creating the array of items ID
  var item_ids = [];
  for(let i=0; i< order.items.length; i++)
    item_ids.push(JSON.parse(order.items.at(i))._id);

  //Creating the saved menu
  SavedMenu.create({
    owner_id: order.owner_id,
    items_id: item_ids
  },
  function (err, savedmenu) {

    if(err)
      next(createError(500));
    else
      res.redirect('/savedmenu');

  });

});

module.exports = router;