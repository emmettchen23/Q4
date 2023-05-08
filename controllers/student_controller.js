const express = require('express'),
  router = express.Router();


const Student = require('../models/student_model');



function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

router.get('/market', loggedIn, function(request, response) {

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/market",{
      user:request.user
    });
});

router.get('/profile', loggedIn, function(request, response) {

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/profile",{
      user:request.user
    });
});

router.get('/sell', loggedIn, function(request, response) {

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/sell",{
      user:request.user
    });
});

router.get('/submitted', loggedIn, function(request, response) {

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/submitted",{
      user:request.user
    });
});

router.post('/sellPost', loggedIn, function(request, response){
    //Student.addSale();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.redirect('/submitted');
});

router.post('/buy', loggedIn, function(request, response){
    //Student.completeSale();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.redirect('/submitted');
});

module.exports = router;
