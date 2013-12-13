
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
app.post('/smio/InsertNewUserREST', apiSMiO.postInsertNewUser);
app.post('/smio/AuthenticateUserREST', apiSMiO.postAuthenticateUser);
//app.post('/smio/InsertNewTripDataREST', apiSMiO.postInsertNewTripData);
//app.post('/smio/UpdateTripDataREST', apiSMiO.postUpdateTripData);
//app.post('/smio/SendEmailForNewPasswordREST', apiSMiO.postSendEmailForNewPassword);
//app.post('/smio/ResetPasswordREST', apiSMiO.postResetPassword);
//app.post('/smio/DeleteUserREST', apiSMiO.postDeleteUser);
//app.post('/smio/DeleteAllTripsREST', apiSMiO.postDeleteAllTrips);
//app.post('/smio/DeleteAllTripsByIdREST', apiSMiO.postDeleteAllTripsById);

//  And start the app on that interface (and port).
app.listen(port, ipaddr, function() {
   console.log('%s: Node server started on %s:%d ...', Date(Date.now() ),
               ipaddr, port);
});
