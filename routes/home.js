
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	
	var errors = [];
	res.render('home',{
		errors:errors
	});
});

module.exports = router;