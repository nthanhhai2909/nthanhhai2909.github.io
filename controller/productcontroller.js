var Books = require('../model/book.js');

exports.add_product = function(req, res, next){
    var books_instance = new Books({
        masach      : req.body.masach,
        tensach     : req.body.tensach,
        loaisach    : req.body.loaisach,
        tentacgia   : req.body.tentacgia,
        nhaxuatban  : req.body.nhaxuatban,
        dongia      : req.body.dongia,
        hinhanh     : req.file.originalname,
    });
    console.log(req.file.originalname);
    // Save the new model instance, passing a callback
    books_instance.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        // req.flash('success_msg', 'Thêm thành công 2');
        res.render('addproduct.hbs',{result: "Thêm thành công"});
    });
};

exports.list_product = function (req, res, next) {
    Books.find({}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }
    res.render('listproduct.hbs', {data_table: products});
        
    });
};

exports.details_product = function (req, res, next) {
    Books.find({'_id':req.params.id}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }
        console.log(products[0].masach);
    res.render('detailsproduct.hbs', {data: products});
    });
};

exports.remove_product = function (req, res, next) {
    Books.remove({_id: req.params.id}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }
        else
        {
            res.redirect('/listproduct');
        }
    });
};
exports.edit_product = function (req, res, next) {
    
    Books.where({_id: req.params.id}).update({
        $set: {
            masach      : req.body.masach,
            tensach     : req.body.tensach,
            loaisach    : req.body.loaisach,
            tentacgia   : req.body.tentacgia,
            nhaxuatban  : req.body.nhaxuatban,
            dongia      : req.body.dongia,
            hinhanh     : req.file.originalname,
        }
    }).update(function(err, result) {
            if (err) {
                console.log('ERROR ==> ' + err)
            } else {
                res.redirect('/detailsproduct/'+req.params.id);
            }
    });
};
exports.edit_product_get = function (req, res, next) {
   Books.find({'_id':req.params.id}, function (err, products) {
        if (err){
            console.log(err);
            return;
        }
        console.log(products);
    res.render('editproduct.hbs', {data: products});
    });
};
