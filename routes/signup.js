var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../model/User');

router.post('/', function(req, res){
    console.log('Inside Post request');
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;
    var confirm = req.body.confirm;

    console.log('name is ' + name);

    //Validations

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is required').isEmail();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('confirm', 'Confirm Password is matching').equals(req.body.password);

    var userData = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    }

    var errors = req.validationErrors();

    if(errors){
        console.log('Inside Errors'+errors);
        res.render('home',{
            errors : errors
        });

    }else{
        console.log('Inside else part to save to user');
        var newUser = new User({
            name : name,
            email : email,
            password : password,
            username : username

        });

        User.createUser(newUser, function(err, user){
            if(err){
                throw err;
            }

            console.log(user);

            console.log('Successfully else part to save to user');
            req.flash('success_msg', 'Your are now registered, Can login now');

            res.redirect('/');
        });

    }
});

module.exports = router;