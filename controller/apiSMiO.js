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


//FINAL V0.9 -- under her, bruk disse 

//receive POST with username and password, returns id
exports.apiAuthenticate = function(req,res){
	User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason){
		//if (err) throw err;
		if(err){
			console.log('login user - something wrong');
			res.send(403, "AuthenticationFailed");
		}
		
        // login was successful if we have a user
        if (user) {
            // handle login success
            console.log('login success');
			//res.send([{User: user}]);
			res.send([{_id: user._id}]);
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

}

//Get spesific user by id, login returns this id
//app.get('/smio/api/user/:uid', apiSMiO.apiUserGetById);
exports.apiUserGet = function(req,res){
//	User.getAuthenticatedId(req.query.username, req.query.password, function(err, uu, reason){
//		if(uu){
			return User.findById(req.params.uid, function(err, user){
				if(user){
					if(!err){
						console.log("Suksess loading user",user);
						return res.send([{User: user}]);
					}else{
						console.log("Error locading user",err);
						return res.send(400, "Error");
					}
				}else{
					console.log("Error locading user",err);
					return res.send(400, "Error");				
				}
			});
//		}else{
//			console.log("Error loading user ",req.query.username);
//			return res.send(500, "Error");
//		}
//	});
}

//Create a user
//app.post('/smio/api/user', apiSMiO.apiUserCreate);
exports.apiUserCreate = function(req,res){
	var newUser = new User({
		username: req.body.username,
		password: req.body.password,
		gender:req.body.gender,
		maritalStatus:req.body.maritalStatus,
		numChildren:req.body.numChildren,
		birtYear:req.body.birtYear,
		occupation:req.body.occupation,
		subscription:req.body.subscription,
		residence:req.body.residence,
		area:req.body.area
	});
	newUser.save(function(err) {
		if(!err){
			console.log('user is :',newUser);
			return res.send([{User: newUser}]);
		}else{
			console.log('Error storing new user:',err);
			return res.send(500, "Error");
		}
	});
}

//UPDATE spesific user by id
//app.put('/smio/api/user/:uid', apiSMiO.apiUserUpdate);
exports.apiUserUpdate = function(req,res){
	return User.findById(req.params.uid, function(err, user){
		if(user){
			//user.username= req.body.username;
			//user.password= req.body.password;
			user.gender=req.body.gender;
			user.maritalStatus=req.body.maritalStatus;
			user.numChildren=req.body.numChildren;
			user.birtYear=req.body.birtYear;
			user.occupation=req.body.occupation;
			user.subscription=req.body.subscription;
			user.residence=req.body.residence;
			user.area=req.body.area;
			return user.save(function (err){
				if (!err){
					console.log('user updated');
					res.send(200, "OK");
				}else{
					console.log('user update error');
					res.send([{User: user}]);
				}
			});
		}else{
			console.log("Update failed, null user");
			return res.send(500,"ERROR");
		}
	});
}

//Delete a spesific user, should we delete trips?
//app.delete('/smio/api/user/:uid, apiSMiO.apiUserDelet);
exports.apiUserDelete = function(req,res){
	if(req.params.uid){
		return User.findById(req.params.uid, function(err,user){
			if(user){
				return user.remove(function(err){
					if(!err){
						console.log("User deleted");
						res.send(200,"OK");
					}else{
						console.log("User delete error");
						return res.send(500,"Error");
					}
				});
			}else{
				console.log("User delete error, null value");
				return res.send(500,"Error");			
			}
		});
	}else{
		console.log("User delete error, null value");
		return res.send(500,"Error");
	}
}





//
//
//
//	OLD STUFF BELOW
//
//
//



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


//
//Receive password reset request
//http://127.0.0.1:8081/smio/ResetPasswordRequest?username=jo.skjermo@sintef.no&passwordnew=test
//
exports.resetPasswordRequest=function(req,res){
	console.log('TEST:',req.query.username);
	console.log('TEST:',req.query.password);
	console.log('TEST:',req.query.passwordNew);

	User.getAuthenticated(req.query.username, req.query.password, function(err, user, reason){
		//if (err) throw err;
		if(err){
			console.log('login user - something wrong');
			//res.send(403, "AuthenticationFailed");
			//return;
		}
		//else{
		//	console.log('login user - ok');
			//res.send(403, "AuthenticationFailed");
		//}
	});

/*
//console.log("TESTTEST00");

        	if (user) {
console.log("TESTTEST0");
			user.passwordTemp=req.query.passwordNew;
console.log("TESTTEST1");


	user.save(function(err) {
		//if (err) throw err;
		if(err){
			console.log('Error storing new password:',err);
			res.send(403, "AuthenticationFailed");
		}else{	//NEW USER REGISTERED - return user - remember to zero password
			//console.log('user is :',testUser);
			res.send([{User: user}]);
		}

	});
*/

/*
			user.reset(function(err) {
				if(err){
					console.log('reset user password - something wrong');
					res.send(403, "AuthenticationFailed");
				}else{
console.log("TESTTEST2");
//					User.update({username:req.query.username, $set:{passwordTemp: req.query.passwordNew}},function(err,results){
//						console.log(result);
//						res.send(200, "OK");

						//SEND MAIL

					});
            		}
			});
        	}
	});
*/
}

//
//Receive password reset request
//http://127.0.0.1:8081/smio/ResetPasswordAuthenticated?username=jo.skjermo@sintef.no&auth=blablabla
//
exports.resetPasswordAuthenticated=function(req, res) {
		//req.params.username,
		//req.params.auth

		//if auth == doublehashed temp new password, set password = new password, and remove temp password.
    		//console.log(req.params.name)
    		//res.send([{Dog: dogtag}]);
}




//
//RETURN USER DATA, username and password must be sett
//
exports.userData = function(req,res){
	User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason){
		//if (err) throw err;
		if(err){
			console.log('login user - something wrong');
			res.send(403, "AuthenticationFailed");
		}
		
     		// login was successful if we have a user
        	if (user) {
           	// handle login success
            	console.log('login success, get user data');
			//user.password="";
		 	res.send([{User: user}]); //REMEMBER TO ZERO PASSWORD
            	return;
        	}
		console.log('Error getting user data:',err);
		res.send(403, "AuthenticationFailed");
    });
}

//
//REGISTER NEW USER
//
exports.registerNewUser = function(req,res){
	var testUser = new User({
		username: req.body.username,
		password: req.body.password,
		gender:req.body.gender,
		maritalStatus:req.body.maritalStatus,
		numChildren:req.body.numChildren,
		birtYear:req.body.birtYear,
		occupation:req.body.occupation,
		subscription:req.body.subscription,
		residence:req.body.residence,
		area:req.body.area
	});
	testUser.save(function(err) {
		//if (err) throw err;
		if(err){
			console.log('Error storing new user:',err);
			res.send(403, "AuthenticationFailed");
		}else{	//NEW USER REGISTERED - return user - remember to zero password
			//console.log('user is :',testUser);
			testUser.password='';
			res.send([{User: testUser}]);
		}
	});
}

//SMIO user authentication, return user (TODO: return "token")
exports.authenticateUser = function(req,res){
	User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason){
		//if (err) throw err;
		if(err){
			console.log('login user - something wrong');
			res.send(403, "AuthenticationFailed");
		}
		
        // login was successful if we have a user
        if (user) {
            // handle login success
            console.log('login success');
			//res.send([{User: user}]);
			res.send([{_id: user._id}]);
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

