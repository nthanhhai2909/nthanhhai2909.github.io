var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/1412147_1412149");

var Schema = mongoose.Schema;

var UserSchema = Schema(
    {
        username: {type: String},
        password: {type: String},
        name: {type: String},
        numberphone: {type: String},
        address: {type: String},
        email: {type: String},
        
    }
);

//Export model
module.exports = mongoose.model('Users', UserSchema);