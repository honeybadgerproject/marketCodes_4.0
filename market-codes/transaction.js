exports.setBraintree = function(app, dbbraintree, gateway) {


  /************* your code ***************/


  app.post('/createBraintreeUser', function(req, res) {
    gateway.createCustomer(req.body)
      .then(function(response) {
        res.json({user: response.customer});
      })
      .catch(function(error) {
        res.status(400).send({error: error});
      });
    });

    app.post('/checkout', function(req, res) {
      var amount = req.body.amount;
      var nonce = req.body.nonce;
      var options = req.body.paymentOptions;
      var handleSuccessfulTransaction = "";
      var handleFailedTransaction = "";
      gateway.createTransaction(amount, nonce, options)
      .then(handleSuccessfulTransaction)
      .catch(handleFailedTransaction);
    });

};
