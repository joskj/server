
var express = require('express');
var mongoose = require('mongoose');
var app = express();

var ipaddr  = "127.0.0.1";
var port    = 8081;
mongoose.connect('mongodb://localhost/smio');

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});
var apiSMiO = require('./controller/apiSMiO.js');



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




//TODO
/*
app.post('/smio/DeleteUser'.apiSMiO.postDeleteUser); //remember to delete trips
app.post('/smio/Trips',api.SMiO.postTrips);
app.post('/smio/UploadTrip',api.SMiO.postUploadTrip);
app.post('/smio/DeleteTrip',apiSMiO.postDeleteTrip);
app.post('/smio/DeleteAllTrips',apiSMiO.postDeleteAllTrips);
*/



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

