var router = require('express').Router()
var config = require('../config')();

//http://HOST/efconfig/ConnectionString/

//Index Page
router.get('/index.html', function(req, res) {
	res.render('efconfig/connectionString.ejs');
});


module.exports = router;