var router = require('express').Router()
var config = require('../config')();
var cmd = config.dbCommand.ConnectionString;

//http://HOST/efconfig/ConnectionString/

//Index Page
router.get('/index.html', function(req, res) {
	res.render('efconfig/connectionString.ejs');
});


//select
router.get('/', function(req, res) {
	var sqlHelper = require('../common/sqlHelper')(getConnectionString(req.params.env));
	var params = [req.query.namespace||'%', 
					req.query.environment||'%',
					req.query.value||'%'];
					
	sqlHelper.query(cmd["get"], params ,function(errMsg,resultCollection){
		res.json({data:resultCollection,message:errMsg});
	});
	
});

//delete
router.delete('/', function(req, res) {  
	var sqlHelper = require('../common/sqlHelper')(getConnectionString(req.params.env));
	var params = [req.body.namespace||'', 
				req.body.environment||''];

	sqlHelper.queryRaw(cmd["delete"], params ,function(errMsg,resultCollection){
		res.json({data:resultCollection,message:errMsg});
	});
});

//create
router.post('/', function(req, res) { 
	var sqlHelper = require('../common/sqlHelper')(getConnectionString(req.params.env));
	var params = [req.body.namespace||'', 
				req.body.environment||'',
				req.body.value||''];

	sqlHelper.queryRaw(cmd["create"], params ,function(errMsg,resultCollection){
		res.json({data:resultCollection,message:errMsg});
	});
	
});

//update
router.put('/', function(req, res) { 
	var sqlHelper = require('../common/sqlHelper')(getConnectionString(req.params.env));
	var params = [req.body.value||'',
				req.body.namespace||'', 
				req.body.environment||''];

	sqlHelper.queryRaw(cmd["update"], params ,function(errMsg,resultCollection){
		res.json({data:resultCollection,message:errMsg});
	});
	
});


var getConnectionString = function(env){
	switch(env){
		case 'dev': return config.dbConnection['dev'];
		case 'qa': return config.dbConnection['qa'];
		default: return config.dbConnection['default'];
	}
}

module.exports = router;