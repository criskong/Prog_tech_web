var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var SavedMenu = require('../models/SavedMenu');
var Order = require('../models/Order');
var Item = require('../models/Item');

/* POST Creates a saved menu from a list of items IDs  */
router.post('/:userId/savedmenu/add', async (req, res, next) => {

  //Creating the saved_menu
  SavedMenu.create({
    owner_id: req.params.userId,
    items_id: req.body.items
  },
  function (err, savedmenu) {

    if(err)
      next(createError(500));
    else
      res.end();

  });

});

/* GET Get all menus that will need to be/are being processed  */
router.get('/:seller/orders', async (req, res, next) => {

  //Getting the orders that the seller needs to be/are being processed
  var rorders = await Order.find({status: 'ricevuto', 
                                  target_seller: req.params.seller});
  var porders = await Order.find({status: 'in preparazione',
                                  target_seller: req.params.seller});

  //Joining the obtained results
  rorders.concat(porders);

  //Returning the obtained orders
  res.end(JSON.stringify(rorders));

});

/* PUT Get all menus that will need to be/are being processed  */
router.put('/:seller/:order/status', async (req, res, next) => {

  //Updating the order to the requested status
  Order.findByIdAndUpdate(req.params.order,{ status: req.body.status },
    function (err, order) {

      if(err)
        next(createError(500));
      else
        res.end();
  
  });

});

/* POST Creates an item for a seller to sell */
router.post('/:seller/item', async (req, res, next) => {

  //Creating the saved_menu
  Item.create({
    seller: req.params.seller,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price
  },
  function (err, item) {

    if(err)
      next(createError(500));
    else
      res.end();

  });

});

module.exports = router;
