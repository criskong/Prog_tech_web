var express = require('express');
var router = express.Router();
var Order = require('../models/Order');
var Item = require('../models/Item');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

/* POST Pay page. */
router.post('/', async (req, res, next) => {

  console.log(req.body);

  /*
    Checking if the user is authenticated and
     acting properly if not
  */
  if(!req.isAuthenticated())
    res.redirect('/login?failed=false');

  var first_plate = await Item.findById(req.body.primo);
  var second_plate = await Item.findById(req.body.secondo);
  var contorno = await Item.findById(req.body.contorno);
  var drink = await Item.findById(req.body.bibita);
  
  //Creating the order using given elements
  var order = await Order.create({

    owner_id: req.session.passport.user,
    items: [
      JSON.stringify(first_plate),
      JSON.stringify(second_plate),
      JSON.stringify(contorno),
      JSON.stringify(drink)
    ],
    total_price: first_plate.price +
                 second_plate.price +
                 contorno.price +
                 drink.price,
    status: 'non pagato',
    target_seller: first_plate.seller
  });

  //Creating paypal payment request data
  var payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/pay/success/"+order._id,
        "cancel_url": "http://localhost:3000/account"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Ordine Enjoyfood",
                "sku": order._id,
                "price": order.total_price,
                "currency": "EUR",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "EUR",
            "total": order.total_price
        },
        "description": "Ordine EnjoyFood per "+order.target_seller
    }]
  };

  paypal.payment.create(payment_json, function (error, payment) {

    if (error)
        res.redirect('/account');
    else 
    {
      for(let i = 0;i < payment.links.length;i++)
      {
        if(payment.links[i].rel === 'approval_url')
          res.redirect(payment.links[i].href);
      }
    }

  });

});

/* GET Success payment page. */
router.get('/success/:orderId', async (req, res, next) => {

  /*
    Checking if the user is authenticated and
     acting properly if not
  */
  if(!req.isAuthenticated())
    res.redirect('/login?failed=false');

  console.log(await Order.findById(req.params.orderId).total_price);

  //Executing payment
  paypal.payment.execute(req.query.paymentId,{
    "payer_id": req.query.PayerID
  }, 
  async (error, payment) => {
    if (error) {
      res.redirect('/account');
    } else {

      //Updating the order status
      await Order.findByIdAndUpdate(req.params.orderId,{ status: 'ricevuto' });
      
      //redirecting to the order info page
      res.redirect('/order/'+req.params.orderId);
    }
  });


});

module.exports = router;