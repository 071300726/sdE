var express = require('express');
var router = express.Router();

var sql = require('msnodesql');

/*
GET	/efconfig/ConnectionString/?namespace=XX&environment=XX
POST	/efconfig/ConnectionString/
DELETE	/efconfig/ConnectionString/?namespace=XX&environment=XX
*/

router.get('/', function(req, res) {
	res.send("1234");
	
			//debugger;
			
	var conn_str="Data Source=cns-etdbdevvs1;Initial Catalog=Rio;Persist Security Info=True;User ID=RioUser;Password=riouserdev";
	 
	sql.open(conn_str, function (err, conn) {
        if (err) {
            console.log('发生错误');
        }
		
        sql.queryRaw(conn_str, "select top 1 1", function (err, results) {
            
        })
    });
	res.send("12345");
});

router.delete('/', function(req, res) {  
	res.send("1234delete");
});

router.post('/', function(req, res) { 
	res.send("1234post");
});

router.put('/', function(req, res) { 
	res.send("1234put"); 
});

module.exports = router;