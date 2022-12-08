var express = require('express');
var router = express.Router();
var Order = require('../models/Order');

/* GET Order details page */
router.get('/:orderId', async (req, res, next) => {
    
    if(req.isAuthenticated())
    {
        //Rendering the page with the required parameters
        res.render('logged_in/order', {
            //Info of the requested order
            order: await Order.findById(req.params.orderId)
        });
    }
    else
        res.redirect('/login?failed=false');
});

module.exports = router;