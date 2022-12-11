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

module.exports = router;