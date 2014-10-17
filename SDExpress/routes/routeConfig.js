var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res) {
	req.signedCookies.userId=1;
  //res.render('index', { title: 'Express' });
});

/* GET user */
router.get('/user', function(req, res) {
  res.send('user');
});


module.exports = router;
