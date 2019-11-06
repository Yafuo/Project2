var express = require('express');
var router = express.Router();
var User = require('../models/user');
var ParkingSlot = require('../models/parkingSlot');
var {isLoggedIn} = require('../custom_lib/authenticate');
var {hash, compare} = require('../custom_lib/bcrypt');
var {verify, sign} = require('../custom_lib/jwt');

/* GET home page. */
router.get('/home', isLoggedIn, function(req, res, next) {
  ParkingSlot.find({})
      .then(parkingSlots => {
        if (!parkingSlots) {
          res.render('home-page', {parkingSlots: [], title: 'Home'});
        } else {
          res.render('home-page', {parkingSlots: parkingSlots, title: 'Home'});
        }
        })
      .catch(err => console.log(err));
});
router.get('/', function(req, res, next) {
  if (req.cookies.token) {
    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
});
router.post('/signup', function (req, res, next) {
  let passwordHash = 'not_hashed';
  let h= hash(req.body.password).then(function(hash, err) {
    passwordHash = hash;
    const user = new User({
      email: req.body.email,
      password: passwordHash,
      isLinkedToMomo: true
    });
    User.findOneAndUpdate({email: user.email}, {password: user.password}).then(updatedUser => {
      if (!updatedUser) {
        user.save().then(result => {
          console.log('CREATED', +result);
        }).catch(err => {
          console.log(err);
        });
        res.status(200).send(user).redirect('/login');
      }
      res.status(200).json({UPDATED: updatedUser});
    }).catch(err => {
      res.status(404);
    });
  }).catch(err => {
    console.log(err);
  });
})
router.get('/login', (req, res) => {
  // verify(req.cookies.token)
  //     .then(decoded => {
  //       req.locals.userId = decoded._id;
  //       res.redirect('/home');
  //     })
  //     .catch(err => {
  //       req.flash('err_msg', err.message);
  //       res.status(500).json({result: 'VERIFY_SERVICE_FAILED'});
  //     });
  if (req.cookies.token) {
    res.redirect('/home');
    return;
  }
  res.render('login-page', {title: 'Login Page'});
});
router.post('/login', (req, res, next) => {
  const {email, password} = req.body;
  User.findOne({email}).then(result => {
    if (!result) {
      res.json({result: 'WRONG_EMAIL'});
      return ;
    }
    compare(req.body.password, result.password).then(r => {
      if (!r) {
        res.json({result: 'WRONG_PASSWORD'});
        return;
      }
      sign({_id: result._id})
          .then(token => {
            res.cookie('token', token, {maxAge: 10*60*1000}).status(200).json({result: 'LOGIN_SUCCESS'});
            console.log(req.cookie.token);
            return;
          })
          .catch(err => {
            res.json({result: 'GENERATE_TOKEN_FAILED'});
            return;
          })
    }).catch(err => {
      res.json({result: 'BCRYPT_SERVICE_FAILED'});
      console.log(err);
    });
  }).catch(err => {
    res.json({result: 'QUERY_DATABASE_FAILED'});
    console.log(err);
  });
});

module.exports = router;
