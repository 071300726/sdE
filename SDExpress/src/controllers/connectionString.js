var router = require('express').Router()
var cmd = require('../config').dbCommand.ConnectionString;
var sqlHelper = require('../common/sqlHelper')();

//http://HOST/efconfig/ConnectionString/

//select
router.get('/', function(req, res) {
	var params = [req.query.namespace||'%', 
					req.query.environment||'%',
					req.query.value||'%'];
					
	sqlHelper.query(cmd["get"], params ,function(errMsg,resultCollection){
		res.json({data:resultCollection,message:errMsg});
	});
	
});

//delete
router.delete('/', function(req, res) {  
	var params = [req.body.namespace||'', 
				req.body.environment||''];

	sqlHelper.queryRaw(cmd["delete"], params ,function(errMsg,resultCollection){
		res.json({data:resultCollection,message:errMsg});
	});
});

//create
router.post('/', function(req, res) { 
	var params = [req.body.namespace||'', 
				req.body.environment||'',
				req.body.value||''];

	sqlHelper.queryRaw(cmd["create"], params ,function(errMsg,resultCollection){
		res.json({data:resultCollection,message:errMsg});
	});
	
});

//update
router.put('/', function(req, res) { 
	var params = [req.body.value||'',
				req.body.namespace||'', 
				req.body.environment||''];

	sqlHelper.queryRaw(cmd["update"], params ,function(errMsg,resultCollection){
		res.json({data:resultCollection,message:errMsg});
	});
	
});

module.exports = router;