var User = require('../model/users.js');

var bcrypt = require('bcryptjs');
var passwordHash = require('password-hash');


//-------------------------Resgister--user----------------------
exports.user_register = function (req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            req.body.password = hash;
            req.body.confirm_password = hash;
            var user_instance = new User({

                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                numberphone: req.body.numberphone,
                address: req.body.address,
                email: req.body.email,
            });

            user_instance.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                req.flash('success_msg', 'Bạn đã đăng ký thành công và có thể đăng nhập');
                res.redirect('/users/login');
               
            });
        });
    });
};
//---------------------------------------------------------------


//--------------------login--user---------------------------------
module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}



//--------------------------load infor account-------------------------------------
exports.loadInfoAcount = function(req, res, next){
    console.log("ssadsdsadasds");
    User.find({}, function (err, user) {
        if (err){
            console.log(err);
            return;
        }
        console.log(user);
        res.render('account.hbs', {data: user});
    });

}

//-------------change info----------------------------------
exports.changeinfo = function(req, res, next)
{
    User.where({username: res.locals.user.username}).update({
        $set: {
            numberphone: req.body.numberphone,
            address: req.body.address,
            email: req.body.email,
            name: req.body.name,
        }
    }).update(function(err, result) {
            if (err) {
                console.log('ERROR ==> ' + err)
            } else {
                res.locals.user.numberphone = req.body.numberphone;
                res.locals.user.address = req.body.address;
                res.locals.user.email = req.body.email;
                res.locals.user.name = req.body.name;
                res.render('account.hbs', {result : 'Thay đổi thành công', active1 : 'active'});
            }
    });
}

exports.changepassword = function(req, res, next)
{

    this.comparePassword(req.body.passold, res.locals.user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){

                if(req.body.passnew != req.body.passconfirm){
                    res.render('account.hbs', {error1 : 'Thay đổi không thành công', active2 : 'active'});
                }
                else{
                    console.log("Login successful");
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(req.body.passnew, salt, function(err, hash) {
                            req.body.passnew = hash;


                            User.where({username: res.locals.user.username}).update({
                                $set: {
                                    password: req.body.passnew,

                                }
                            }).update(function(err, result) {
                                    if (err) {
                                        console.log('ERROR ==> ' + err)
                                    } else {
                                        res.locals.user.password = req.body.passnew;
                                        
                                        res.render('account.hbs', {result : 'Thay đổi thành công', active2 : 'active'});
                                    }
                            });
                        });
                    });
                }
                
            } else {
                console.log("Invalid password");
                res.render('account.hbs', {error1 : 'Thay đổi không thành công', active2 : 'active'});
            }
        });

    





    
}



exports.list_user = function (req, res, next) {
    User.find({}, function (err, user) {
        if (err){
            console.log(err);
            return;
        }
    res.render('listuser.hbs', {data_table: user});
        
    });
};