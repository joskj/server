var mongoose = require('mongoose'), Schema = mongoose.Schema;

var userSchema = new Schema({
	userName: {type: String, required: true, index: true},
	pinCode: {type: String, required:true},
	gender: String,
	maritalStatus: String,
	numChildren: Number,
	birthYear: Number,
	occupation: String,
	subscription: String,
	residence: String,
	area: String
});


module.exports = mongoose.model('User', userSchema);
