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

  Admin.getTransactions(function(rows){


    let closedT = [];
    for(let i = 0; i < rows.length; i++){
      if(rows[i]["userBuyId"] != "n/a"){

        closedT.push(rows[i]);
      }
    }
    console.log(closedT);

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("admin/transactionHistory",{
      closedT: closedT,
      user:request.user
    });

    });
});

router.get('/userBreakdown', loggedIn, function(request, response) {

  Admin.getUsers(function(rows){


    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("admin/userBreakdown",{
      userRows: rows,
      user:request.user
    });

    });
});

router.post('/refreshTrans', loggedIn, function(request, response){
    Admin.refreshTrans();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.redirect('/transactionHistory');
});

router.post('/removeUser', loggedIn, function(request, response){
    let email = request.body.email;
    Admin.removeUser(email);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.redirect('/userBreakdown');
});

module.exports = router;
