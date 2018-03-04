var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	console.log('Inside About page');
	res.render('about');
});

module.exports = router;