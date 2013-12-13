/*
 * Copyright (c) 2012., Qualcomm, Inc.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

var User = require('../model/user.js');
var Trip = require('../model/trip.js');

exports.postInsertNewUser = function(req, res) {
	//TODO: Error checks
	//console.log(req.body.name);
	var user = new User({
		userName:req.body.userName,
		pinCode:req.body.pinCode,
		gender:req.body.gender,
		maritalStatus:req.body.maritalStatus,
		numChildren:req.body.numChildren,
		birtYear:req.body.birtYear,
		occupation:req.body.occupation,
		subscription:req.body.subscription,
		residence:req.body.residence,
		area:req.body.area
	});
	user.save(function (err) {
		if(err) throw err;
		console.log('User Saved.');
	});
	res.send("_id:"+user._id);
}

exports.postAuthenticateUser = function(req, res) {
	//TODO: Error checks
	User.findOne({userName: req.body.userName, pinCode: req.body.pinCode}, function(err, user){
		if(err) throw err;
		console.log('User Ok');
		res.send([{User: user}]);
	});

}







