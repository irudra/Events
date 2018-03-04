var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../model/User');

router.post('/', function(req, res){
    console.log('Inside Post request');

    console.log('User Email is ' + req.body.email);

    //Validations

    req.checkBody('firstName', 'First name is required').notEmpty();
    req.checkBody('lastName', 'Last name is required').notEmpty();
    req.checkBody('mobileNumber', 'Mobile number is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is required').isEmail();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('confirm', 'Confirm Password is matching').equals(req.body.password);

    var userData = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        mobileNumber:req.body.mobileNumber
    }

    var errors = req.validationErrors();

    if(errors){
        console.log('Inside Errors'+errors);
        res.render('home',{
            errors : errors
        });

    }else{
        console.log('Inside else part to save to user');

        request.post({url:'http://localhost:5000/registerUser', json:userData, }, function callback(error, response, body){
            if (error){
                console.log(error);
                throw error;
            }
            console.log("logged in user" + JSON.stringify(body));
            res.redirect("/")
        });

    }
});

module.exports = router;