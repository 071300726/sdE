var connectionStringNamespaceSvc = require('../controllers/service/connectionStringNamespace');
var connectionStringSvc = require('../controllers/service/connectionString');
var connectionStringIndex = require('../controllers/connectionString');

module.exports = function(app){
	//ConnectString
	app.use('/efconfig/service/connectionstringnamespace',connectionStringNamespaceSvc);
	app.use('/efconfig/service/connectionstring',connectionStringSvc);
	app.use('/efconfig/connectionstring',connectionStringIndex);
	
	
	//CCL	
	
	
	//ConfigValue
	
	
	//WCF
	
	
};
