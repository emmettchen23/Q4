const multer = require('multer');
//const express = require('express');
const ejs = require('ejs');
const express = require('express'),
  router = express.Router();

const Student = require('../models/student_model');
const User = require('../models/user_model');

let publicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
  }
});

let publicUpload = multer({ storage: publicStorage });




//Uploading to a public static folder
router.post('/upload/photo', publicUpload.single('picture'), (req, res, next) => {

  const file = req.file;
  console.log(file);
  if (!file) {
    const error = {
    'httpStatusCode' : 400,
    'message':'Please upload a file'
     }
    res.send(error);
  }
  let name = req.body.name;
  let des = req.body.des;
  let imageSRC = "/uploads/"+file.filename;
  let user = req.user._json.email;

  Student.addTran(user, name, des, imageSRC);

  res.render('student/submitted',{
    user: req.user,
    imageSRC: imageSRC
    //photoLocation: "/uploads/"+file.filename
  });
})


function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

router.get('/market', loggedIn, function(request, response) {

  Student.getTransactions(function(rows){

    let openT = [];

    for(let i = 0; i < rows.length; i++){

      if(rows[i]["userBuyId"] == "n/a"){

        openT.push(rows[i]);

      }
    }

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/market",{
      openT: openT,
      user:request.user
    });

  });
});

router.get('/profile', loggedIn, function(request, response) {

  Student.getTransactions(function(rows){


    let openT = [];
    let closedT = [];
    let boughtItems = [];
    for(let i = 0; i < rows.length; i++){

      if(rows[i]["userPostId"] == request.user._json.email && rows[i]["userBuyId"] == "n/a"){

        openT.push(rows[i]);

      }
      if(rows[i]["userPostId"] == request.user._json.email && rows[i]["userBuyId"] != "n/a"){

        closedT.push(rows[i]);
      }
      if(rows[i]["userBuyId"] == request.user._json.email){

        boughtItems.push(rows[i]);
      }
    }



    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/profile",{
      openT: openT,
      closedT: closedT,
      boughtItems: boughtItems,
      user:request.user
    });

  });
/*
  Student.getStudents(function(rows){
    console.log(rows);


    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/profile",{
      students: rows,
      photoLocation: "/uploads/" + "image-1683491793468.jpeg",
      user:request.user
    });

  });
  */

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

router.get('/forum', loggedIn, function(request, response) {

    //let user = User.getUser(request.user._json.email);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/forum", {
      user: request.user
    });
});


router.post('/buy', loggedIn, function(request, response){

    let id = request.body.id;
    console.log(id);

    let imageSRC = request.body.imageSRC;
    let userBuyId = request.user._json.email;
    let userPostId = request.body.userPostId;
    let title = request.body.title[0];
    let description = request.body.description;
    console.log(title);
    console.log("title");

  Student.completeSale(userPostId, userBuyId, title, description, imageSRC);
/*
    Student.completeSale(imageSRC, userBuyId, function(err) {
      if(err) {
        console.error(err);
        return;
      }
    });
*/
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('student/submitted',{
      user:request.user,
      imageSRC: imageSRC
    });
});


module.exports = router;
