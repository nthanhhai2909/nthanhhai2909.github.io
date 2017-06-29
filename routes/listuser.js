var express = require('express');
var router = express.Router();

var userController = require('../controller/userscontroller.js');

router.get('/', function(req, res){
	userController.list_user(req, res);
});



module.exports = router;