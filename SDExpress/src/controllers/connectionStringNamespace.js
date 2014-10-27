var express = require('express');
var router = express.Router();

/*
GET	/efconfig/ConnectionStringNamespace/?namespace=XX
POST	/efconfig/ConnectionStringNamespace/
DELETE	/efconfig/ConnectionStringNamespace/?namespace=XX
*/
router.get('/', function(req, res) {
	res.send("123");
});

router.delete('/', function(req, res) {  
	res.send("123delete");
});

router.post('/', function(req, res) { 
	res.send("123post");
});

router.put('/', function(req, res) { 
	res.send("123put"); 
});

module.exports = router;