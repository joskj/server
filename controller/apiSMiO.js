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

/*
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

exports.authenticateUser = function(req, res) {
	//TODO: Error checks
	User.findOne({userName: req.body.userName, pinCode: req.body.pinCode}, function(err, user){
		if(err) throw err;
		console.log('User Ok');
		res.send([{User: user}]);
	});

}
*/



//SMIO user authentication, return user (TODO: return "token")
exports.authenticateUser = function(req,res){
/*
	var testUser = new User({
		username: 'jmar777',
		password: 'Password123'
	});
	testUser.save(function(err) {
		if (err) throw err;
	});
*/

	User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason){
		if (err) throw err;
		
        // login was successful if we have a user
        if (user) {
            // handle login success
            console.log('login success');
			res.send([{User: user}]);
            return;
        }
        // otherwise we can determine why we failed
        var reasons = User.failedLogin;
        switch (reason) {
            case reasons.NOT_FOUND:
				console.log('login user not found');
				//res.send([{User: ''}]);
				res.status=403;
				//res.send({status:403, err:"AuthenticationFailed"});
				res.send(403, "AuthenticationFailed");				
				break;
            case reasons.PASSWORD_INCORRECT:
                // note: these cases are usually treated the same - don't tell
                // the user *why* the login failed, only that it did
				console.log('login password incorrect');
				res.status=403;
				//res.send({status:403, err:"AuthenticationFailed"});
				res.send(403, "AuthenticationFailed");				
                break;
            case reasons.MAX_ATTEMPTS:
                // send email or otherwise notify user that account is
                // temporarily locked
				console.log('login max attempts');
				res.status=403;
				//res.send(403, "AuthenticationFailed");
				res.send({status:403, err:"AuthenticationFailed"});
                break;
        }
    });

	/*
	User.findOne({username: req.body.username}, function(err,user){
		if (err) throw err;
		
		user.comparePassword(req.body.password, function(err,isMatch){
			if (err) throw err;
			console.log('Password is :',isMatch);
		});
	});
	*/
	
//	User.findOne({userName: req.body.userName, pinCode: req.body.pinCode}, function(err, user){
//		if(err) throw err;
//		console.log('User Ok');
//		res.send([{User: user}]);
//	});
}

//SMIO register user








