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

var measureSchema = new Schema({
	time:{type: Date, default:Date.now},
	altitude:{type: Number},
	heading:{type: Number},
	speed:{type: Number},
	accurancyAltitude: {type: Number},
	accurancyCoord: {type:Number}
});

var subTripSchema = new Schema({
	userId: Schema.ObjectId,
	travelmode: String,
	distance: Number,
	startTime:{type: Date, default:Date.now},
	endTime:{type: Date, default:Date.now},
	coords: {loc:{type:[Number],index:'2dsphere'}},
	data: [measureSchema]
});

var tripSchema = new Schema({
	userId: Schema.ObjectId,
	purpose: String,
	trips: [subTripSchema]
});

module.exports = mongoose.model('Trip', tripSchema);
