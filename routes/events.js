var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	console.log('Inside Events page');
	res.render('events');
});

module.exports = router;