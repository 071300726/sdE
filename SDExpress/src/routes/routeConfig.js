var connectionStringNamespace = require('../controllers/connectionStringNamespace');
var connectionString = require('../controllers/connectionString');

module.exports = function(app){
	app.use('/efconfig/connectionstringnamespace',connectionStringNamespace);
	app.use('/efconfig/connectionstring',connectionString);
};
