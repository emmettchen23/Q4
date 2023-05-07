const express = require('express'),
  router = express.Router();

const Admin = require('../models/admin_model');

function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

router.get('/adminPage', loggedIn, function(request, response) {

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("admin/adminPage",{
      user:request.user
    });
});

router.get('/transactionHistory', loggedIn, function(request, response) {

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("admin/transactionHistory",{
      user:request.user
    });
});

router.get('/userBreakdown', loggedIn, function(request, response) {

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("admin/userBreakdown",{
      user:request.user
    });
});

module.exports = router;
