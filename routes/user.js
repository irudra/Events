var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	console.log('Inside Welcome page');
});

module.exports = router;