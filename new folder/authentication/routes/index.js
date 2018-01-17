var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../schema/user');
var Response = require('../common/response');

var config = require('../config');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* REGISTER USER. */
router.post('/register', function(req, res) {
 var data = new User(req.body);
 data.save(function(err){
  if(err){
    console.log(err);
      Response.errorResponse(err.message,res);
  }else{
      Response.successResponse('User registered successfully!',res,{});
  } 
 })
});


/* LOGIN USER. */
router.post('/login', function(req, res) {
 var email = req.body.email;
 var password = req.body.password;
 User.findOne({email: email, password: password}, function(err,user){
   if(err){
     console.log(err);
      Response.errorResponse(err.message,res);
   }
   if(!user){
     Response.notFoundResponse('Invalid Email Id or Password!',res);
   }else{
   /* console.log(user);
    let token = jwt.sign(user.toJSON(),config.secret, {
         expiresIn: 1440 // expires in 1 hour
     });
     res.json({error:false, token: token});*/
 
     req.session.user = user;
     Response.successResponse('User loggedin successfully!',res,user);
   }
   
 })
});
router.post('/authenticate', function(req, res){
  
      var email=req.body.email;
     var password=req.body.password;

     User.findOne({email: email, password: password}, function(err,user){
      if(err){
          return res.json({error: true});
      }
      if(!user){
          return res.status(404).json({'message':'User not found!'});
      }
      //res.writeContinue();
      console.log(user);
     let token = jwt.sign(user.toJSON(),config.secret, {
          expiresIn: 1440 // expires in 1 hour
      });
      req.session.user = user;
    // Response.successResponse('User loggedin successfully!',res,user);
      res.json({error:false, token: token});
  })
});
/* GET DASHBOARD */
router.get('/dashboard', function(req, res) {
  if(!user){
    Response.unauthorizedRequest('You are not logged in',res);
  }else{
    Response.successResponse('Welcome to dashboard!',res,req.session.user);
  }
  
});

/* GET LOGOUT */
router.get('/logout', function(req, res) {
 // JWTAuth::invalidate($token);
  req.session.destroy(function(err){  
        if(err){  
            console.log(err); 
            Response.errorResponse(err.message,res); 
        }  
        else  
        {  /*function wp_destroy_current_session() {
          $token = wp_get_session_token();
          if ( $token ) {
              $manager = WP_Session_Tokens::get_instance( get_current_user_id() );
              $manager->destroy( $token );
          }
      }*/
            Response.successResponse('User logged out successfully!',res,{}); 
        }  
    });
});
module.exports = router;
