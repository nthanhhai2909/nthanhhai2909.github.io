var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/1412147_1412149");

var Schema = mongoose.Schema;

var BooksSchema = Schema(
    {
        masach: {type: String},
        tensach: {type: String},
        loaisach: {type: String},
        tentacgia: {type: String},
        dongia: {type: String},
        nhaxuatban: {type: String},
        hinhanh: {type: String},
    }
);

//Export model
module.exports = mongoose.model('Books', BooksSchema);