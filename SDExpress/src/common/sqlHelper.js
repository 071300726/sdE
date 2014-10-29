var mssql = require('msnodesql');
var config = require('../config');

var helper = function(conn_str){
	conn_str = conn_str || config.dbConnection['default'];

	var query = function(sqlText, params, callback){
		mssql.open(conn_str, function (err, conn) {
			if (err) {
				console.log('打开链接时发生异常');
				console.log(err.message);
				callback(mergeError([err]));
				return;
			}
			
			var errCollection = [];
			var resultCollection = [];
			
			conn.query(sqlText, params, function (err, results, more) {
				errCollection.push(err);
				resultCollection.push(results);
				
				more || callback(mergeError(errCollection), results, more);
			});
		});
	};
	
	var queryRaw = function(sqlText, params, callback){
		mssql.open(conn_str, function (err, conn) {
			if (err) {
				console.log('打开链接时发生异常');
				console.log(err.message);
				callback(mergeError([err]));
				return;
			}
			
			var errCollection = [];
			var resultCollection = [];
			
			conn.queryRaw(sqlText, params, function (err, results, more) {
				errCollection.push(err);
				resultCollection.push(results);

				more || callback(mergeError(errCollection), resultCollection);
			});
		});
	};
	
	return {
		query:query,
		queryRaw:queryRaw
	};
}

var mergeError=function(errCollection){
	var strBuilder = [];
	if(errCollection&&errCollection.length>0){
		errCollection.forEach(function(item){
			item && strBuilder.push(item.message);
		});
	}
	return strBuilder.join('\r\n');
}

module.exports=helper;