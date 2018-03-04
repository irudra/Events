var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/', function(req, res){
    var postData = {
        'username': 'hemant',
        'password':'password',
        'key':'key'
    };

    request.post({url:'http://localhost:5000/auth', json:postData}, function callback(error, response, body){
        if (error){
            console.log(error);
            throw error;
        }
        console.log("logged in user" + JSON.stringify(body));
    });
    res.redirect("/");
});

module.exports = router;