var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/', function(req, res){
    var postData = {
        'username': 'hemant',
        'password':'poassword',
        'key':'key'
    };

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/auth',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData))
        }
    };
    request.post({url:'http://localhost:5000/auth', formData:postData}, function callback(error, response, body){
        if (error){
            console.log(error);
            throw error;
        }
        console.log("logged in user" + body);
    });
    res.redirect("/");
});

module.exports = router;