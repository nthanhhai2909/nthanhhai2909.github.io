var express =  require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// 

var expressValidator = require('express-validator');
var session = require('express-session');
var flash = require('connect-flash'); 

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.set("views engine", "hbs");
app.set("views", "./views");
app.use(express.static('./public'));

//-----------------------------------------------------------------------------------------




//-----------------------------------------------------------------------------------------

var routes = require('./routes/index.js');

var users = require('./routes/users.js');
var listproducts = require('./routes/listproduct.js');
var addproduct = require('./routes/addproduct.js');
var detailsproduct = require('./routes/detailsproduct.js');
var listuser = require('./routes/listuser.js');

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


//Passport init
app.use(passport.initialize());
app.use(passport.session());



// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//connect Flash
app.use(flash());
//global vars
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
	next();
});

app.get("/", routes);

app.use('/index', routes);
app.use('/users', users);
app.use('/listproduct', listproducts);
app.use('/addproduct', addproduct);
app.use('/detailsproduct', detailsproduct);
app.use('/listusers', listuser);

module.exports = app;
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})