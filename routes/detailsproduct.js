var express = require('express');
var router = express.Router();
var productController = require('../controller/productcontroller.js');


router.get('/:id', function(req, res){
	productController.details_product(req, res);
});

router.post('/:id', function(req, res, next){
    if (req.body.submit == 'remove_product') {
        productController.remove_product(req, res, next);
    }
    if (req.body.submit == 'edit_product') {
        productController.edit_product_get(req, res, next);
    }

    if (req.body.submit == 'edit_product_default') {
     	productController.edit_product(req, res, next);
    }
});


module.exports = router;