
var mongoose = require('mongoose'), Schema = mongoose.Schema;

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

module.exports = mongoose.model('SubTrip', subTripSchema);