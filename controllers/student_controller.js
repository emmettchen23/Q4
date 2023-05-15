const multer = require('multer');
//const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const express = require('express'),
  router = express.Router();


const Student = require('../models/student_model');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.set('views', __dirname + '/views'); //specify location of templates
app.set('view engine', 'ejs'); //specify templating library

// SET STORAGE
let privateStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
  }
});
let privateUpload = multer({ storage: privateStorage });

let publicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
  }
});
let publicUpload = multer({ storage: publicStorage });




//Uploading to a public static folder
app.post('/upload/photo', publicUpload.single('picture'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = {
    'httpStatusCode' : 400,
    'message':'Please upload a file'
     }
    res.send(error);
  }

  res.render('student/profile',{
    user: request.user,
    photoLocation: "/uploads/"+file.filename
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

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/market",{
      user:request.user
    });
});

router.get('/profile', loggedIn, function(request, response) {

  let studentsArray = Student.getStudents();
    console.log(studentsArray);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("student/profile",{
      students: studentsArray,
      photoLocation: "/uploads/" + "image-1683491793468.jpeg",
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
