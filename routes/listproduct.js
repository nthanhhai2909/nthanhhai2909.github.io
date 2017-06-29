var express = require('express');
var router = express.Router();

var productController = require('../controller/productcontroller.js');

router.get('/', function(req, res){
	productController.list_product(req, res);
});



module.exports = router;