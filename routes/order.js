var express = require('express');
var router = express.Router();
var Order = require('../models/Order');
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

module.exports = router;