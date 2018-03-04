var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	console.log('Inside contactUs page');
	res.render('contactUs');
});

module.exports = router;