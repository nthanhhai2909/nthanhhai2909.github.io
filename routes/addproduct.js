var express = require('express');
var router = express.Router();

var productController = require('../controller/productcontroller.js');

router.get('/', function(req, res){
	res.render('addproduct.hbs');
});


//------------------------------
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb){
    	cb(null, './public/images/books')
	},
    filename: function(req, file, cb){
      	cb(null, file.originalname)
    }
});

var upload = multer({storage : storage});
//------------------------------


router.post('', upload.single('avatarbook'), function(req, res){


	var masach = req.body.masach;
	var tensach = req.body.tensach;
	var loaisach = req.body.loaisach;
	var tentacgia = req.body.tentacgia;
	var dongia = req.body.dongia;
	var nhaxuatban = req.body.nhaxuatban;

	

	req.checkBody('masach', 'Chưa nhập mã sách').notEmpty();
	req.checkBody('tensach', 'Chưa nhập tên sách').notEmpty();
	req.checkBody('loaisach', 'Chưa nhập loai').notEmpty();
	req.checkBody('tentacgia', 'Chưa nhập tên tác giả').notEmpty();
	req.checkBody('dongia', 'Chưa nhập đơn giá').notEmpty();
	req.checkBody('nhaxuatban', 'Chưa nhập nhà xuất bản').notEmpty();

	var errors = req.validationErrors();
	if(errors){
		res.render('addproduct.hbs',{errors:errors});
	}else{
		productController.add_product(req, res);
		// res.render('addproduct.hbs');
	}

});

module.exports = router;