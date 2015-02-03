var router = require('express').Router()
var config = require('../../config')();
var cmd = config.dbCommand.ConnectionStringNamespace;

//http://HOST/efconfig/ConnectionStringNamespace/

//select
router.get('/', function(req, res) {
	var sqlHelper = require('../../common/sqlHelper')(getConnectionString(req.params.env));
	var params = [req.query.namespace||'%'];
					
	sqlHelper.query(cmd["get"], params ,function(errMsg,resultCollection){
		res.json({data:resultCollection,message:errMsg});
	});
	
});

//delete
router.delete('/', function(req, res) {  
	var sqlHelper = require('../../common/sqlHelper')(getConnectionString(req.params.env));
	var params = [req.body.namespace||''];

	sqlHelper.queryRaw(cmd["delete"], params ,function(errMsg,resultCollection){
		res.json({data:resultCollection,message:errMsg});
	});
});

//create
router.post('/', function(req, res) { 
	var sqlHelper = require('../../common/sqlHelper')(getConnectionString(req.params.env));
	var params = [req.body.namespace||''];

	sqlHelper.queryRaw(cmd["create"], params ,function(errMsg,resultCollection){
		res.json({data:resultCollection,message:errMsg});
	});
	
});

//update
router.put('/', function(req, res) { 
	res.json({data:null,message:"don't support update dbo.ConnectionStringNamespace"});	
});


var getConnectionString = function(env){
	switch(env){
		case 'dev': return config.dbConnection['dev'];
		case 'qa': return config.dbConnection['qa'];
		default: return config.dbConnection['default'];
	}
}

module.exports = router;