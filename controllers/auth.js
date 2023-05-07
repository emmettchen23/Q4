const express = require('express'),
  router = express.Router();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const KEYS = require('../config/keys.json');
//keeping our secrets out of our main application is a security best practice
//we can add /config/keys.json to our .gitignore file so that we keep it local/private

let userProfile; //only used if you want to see user info beyond username



router.use(session({
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000 //600 seconds of login time before being logged out
  },
  secret: KEYS["session-secret"]
}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: KEYS["google-client-id"],
    clientSecret: KEYS["google-client-secret"],
    callbackURL: "http://localhost:3000/auth/google/callback"
    //todo: port==process.env.PORT? :
  },
  function(accessToken, refreshToken, profile, done) {
    userProfile = profile; //so we can see & use details form the profile
    return done(null, userProfile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*
  This triggers the communication with Google
*/
router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email']
  }));

/*
  This callback is invoked after Google decides on the login results
*/
router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/error?code=401'
  }),
  function(request, response) {

    console.log(userProfile);
    let a = request.user._json.email;
    console.log("a");
    let b = a.split("");
    if(a == "justin.godhe@trinityschoolnyc.org"){
      response.redirect('admin/adminPage');
    }
    for(let i = 0; i< b.length; i++){
      if(b[i] == "1" || b[i] == "2" || b[i] == "3" || b[i] == "4" || b[i] == "5" || b[i] == "6" || b[i] == "7" || b[i] == "8" || b[i] == "9"){
        response.redirect('/profile')
      }
    }
    response.redirect('/profile');
  });

router.get("/auth/logout", (request, response) => {
  request.logout();
  let playerID = request.user._json.email;
  //Player.createPlayer(playerID, playerID.split('.')[0]);//only creates if not in players.json
  response.redirect('/');
});

module.exports = router;
