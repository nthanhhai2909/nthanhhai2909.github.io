var express = require('express');
var router = express.Router();

var userController = require('../controller/userscontroller.js');
var bodyParser = require("body-parser");


router.get('/signup', function(req, res){
	res.render('signup.hbs');
});

router.get('/login', function(req, res){
	res.render('login.hbs');
});



//------------------------------post---signup------------------------
router.post('/signup', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var confirm_password = req.body.confirm_password;
	var email = req.body.email;
	var address = req.body.address;
	var numberphone = req.body.numberphone;

	if(req.body.username != req.body.confirm_password){
        res.render('signup.hbs',{errors:'Invalid Confirm password'});
    }
    else{
    	req.checkBody('username', 'Username is require').notEmpty();
		req.checkBody('name', 'Name is require').notEmpty();
		req.checkBody('password', 'Password is require').notEmpty();
		req.checkBody('confirm_password', 'Confirm password is require').equals(req.body.password);
		req.checkBody('numberphone', 'Number phone is require').notEmpty();
		req.checkBody('email', 'Email is not valid').notEmpty();
		req.checkBody('address', 'Address is require').notEmpty();
		

		var errors = req.validationErrors();
		if(errors){
			res.render('signup.hbs',{errors:errors});
		}else{
			userController.user_register(req, res);
		}
    }


	
});
//------------------------------------------------------------------


//------------------------------post---login---------------------------
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(username, password, done) {
	   	userController.getUserByUsername(username, function(err, user){
		   	if(err) throw err;
		   	if(!user){
		   		console.log("Unknown User");
		   		return done(null, false, {message: 'Unknown User'});
	   		}

	   	userController.comparePassword(password, user.password, function(err, isMatch){
	   		if(err) throw err;
	   		if(isMatch){
	   			console.log("Login successful");
	   			return done(null, user);
	   		} else {
	   			console.log("Invalid password");
	   			return done(null, false, {message: 'Invalid password'});
	   		}
	   	});
   	});
}));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userController.getUserById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/login',
	passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
	function(req, res) {
	    res.redirect('/');
  });
//------------------------------------------------------------------



router.get('/logout', function(req, res) {
		req.logout();
		req.flash('success_msg', 'Bạn đã đăng xuất');
	    res.redirect('/users/login');
  });

//---------------------------acount-info---------------------------------------
router.get('/account', function(req, res, next){

	//userController.loadInfoAcount(req, res, next);
	res.render('account.hbs', {active1 : 'active'});
});


router.post('/account', function(req, res, next){
	
	if (req.body.submit == 'changeinfo') {
        userController.changeinfo(req, res, next);
    }
    if (req.body.submit == 'changepassword') {
        userController.changepassword(req, res, next);
    }
});






module.exports = router;