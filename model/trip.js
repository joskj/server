var mongoose = require('mongoose'), Schema = mongoose.Schema;

var subTripSchema = new Schema({
	purpose: String,
	travelmode: String,
	startTime:{type: Date, default:Date.now},
	endTime:{type: Date, default:Date.now},
	coords:{loc:{type:[Number],index:'2dsphere'}},
	timestamp:[{type: Date, default:Date.now}],
	altitude:[{type: Number}],
	heading:[{type: Number}],
	speed:[{type: Number}],
	accurancyAltitude: [{type: Number}],
	accurancyCoord: [{type:Number}]
});

var tripSchema = new Schema({
	userId: Schema.ObjectId,
	purpose: String,
	startTime:{type: Date, default:Date.now},
	endTime:{type: Date, default:Date.now},
	subTrips:[subTripSchema]

});

module.exports = mongoose.model('Trip', tripSchema);