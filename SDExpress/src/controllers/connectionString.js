var express = require('express');
var router = express.Router();

var sql = require('msnodesql');

/*
GET	/efconfig/ConnectionString/?namespace=XX&environment=XX
POST	/efconfig/ConnectionString/
DELETE	/efconfig/ConnectionString/?namespace=XX&environment=XX
*/

router.get('/', function(req, res) {
	
	
			debugger;
			
	var conn_str="Driver={SQL Server Native Client 11.0};Server=cns-etdbdevvs1;UID=RioUser;PWD=riouserdev;Database={Rio}";
	 
	sql.open(conn_str, function (err, conn) {
        if (err) {
            console.log('发生错误');
        }
		
        sql.queryRaw(conn_str, "select top 1 * from RIO.DBO.UserInfo", function (err, results) {
			var sb=[];
			for(var i = 0;i<results.rows.length;i++){
				sb.push(i+":"+results.rows[i])
			}
			res.send(sb.join(''));
        })
    });
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