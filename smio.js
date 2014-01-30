
var express = require('express');
var mongoose = require('mongoose');

var app = express();

//HTTP Service Settings
var ipaddr  = "127.0.0.1";
var port    = 8081;

//MONGODB connection
mongoose.connect('mongodb://localhost/smio');

//CONFIGURATION
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});
var apiSMiO = require('./controller/apiSMiO.js');


//FINAL v0.9 
//----------

//Authenticate, username and password
app.post('/smio/api', apiSMiO.apiAuthenticate);		//authenticate user, returns id, user id required for AJAX

//AJAX for user
app.post('/smio/api/user', apiSMiO.apiUserCreate);		//POST, Create a user - returns user id
app.get ('/smio/api/user/:uid', apiSMiO.apiUserGet);		//GET specific user by id, login returns this id
app.put ('/smio/api/user/:uid', apiSMiO.apiUserUpdate);	//UPDATE specific user by id
app.del ('/smio/api/user/:uid', apiSMiO.apiUserDelete);	//DELETE a specific user, remembered to delete trips?
//app.post('/smio/api/user/:uid/resetPassword', apiSMiO.apiPasswordPost);//request password reset, username, password and newpassword - >send mail
//app.get ('/smio/api/user/:uid/resetPassword', apiSMiO.apiPasswordGet);	//authenticate the password reset using link in mail

//TODO - trips
//app.get('/smio/api/user/:uid/trips', apiSMiO.apiTripsGet);			//GET some data for all trips for a specific user (to fill in trips list view)
//app.del('/smio/api/user/:uid/trips', apiSMiO.apiTripsDelete);		//DELETE ALL trips for the specific user

//TODO - trip
//app.post('/smio/api/user/:uid/trip, apiSMiO.apiTripPost);			//POST a new trip for a user
//app.get('/smio/api/user/:uid/trip/:tripid, apiSMiO.apiTripGet);	//GET a specific trip for a user
//app.del('/smio/api/user/:uid/trip/:tripid, apiSMiO.apiTripDelete);	//DELETE a specific trip for a user






//  And start the app on that interface (and port).
app.listen(port, ipaddr, function() {
   console.log('%s: Node server started on %s:%d ...', Date(Date.now() ),
               ipaddr, port);
});














//OLD INTEFACE
//app.post('/smio/InsertNewUserREST', apiSMiO.postInsertNewUser);
//app.post('/smio/AuthenticateUserREST', apiSMiO.postAuthenticateUser);
//app.post('/smio/InsertNewTripDataREST', apiSMiO.postInsertNewTripData);
//app.post('/smio/UpdateTripDataREST', apiSMiO.postUpdateTripData);
//app.post('/smio/SendEmailForNewPasswordREST', apiSMiO.postSendEmailForNewPassword);
//app.post('/smio/ResetPasswordREST', apiSMiO.postResetPassword);
//app.post('/smio/DeleteUserREST', apiSMiO.postDeleteUser);
//app.post('/smio/DeleteAllTripsREST', apiSMiO.postDeleteAllTrips);
//app.post('/smio/DeleteAllTripsByIdREST', apiSMiO.postDeleteAllTripsById);



//MORE OLD STUFF
/*
//
//Receive a post request containing username and password
//Test file "postAuthenticateUserTest.json":
//{
//	"userName":"Jo.Skjermo@sintef.no",
//	"pinCode":"1234"
//}
//Test using curl:
//curl.exe -X POST -d @postAuthenticateUserTest.json http://localhost:8081/smio/AuthenticateUser  --header "Content-Type:application/json"
//Return a user json object, TODO - return a TOKEN instead
app.post('/smio/AuthenticateUser',apiSMiO.authenticateUser);


//
//REGISTER NEW USER
//TEST: c:\putty\curl.exe -X POST -d @registerNewUser.json http://localhost:8081/smio/RegisterNewUser --header "Content-Type:application/json"
//
app.post('/smio/RegisterNewUser',apiSMiO.registerNewUser);


//
//RETURN USER DATA, username and password must be sett
//
app.post('/smio/User',apiSMiO.userData);


//
//temp
//
//app.post('/smio/ResetPasswordRequest',apiSMiO.resetPasswordRequest);
app.get('/smio/ResetPasswordRequest',apiSMiO.resetPasswordRequest);

//
//temp
//
app.get('/smio/ResetPasswordAuthenticated?:username&:auth',apiSMiO.resetPasswordAuthenticated);


*/