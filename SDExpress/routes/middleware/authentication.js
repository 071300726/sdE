var express = require('express');

var auth = function(req, res , next){
	if(req.signedCookies.userId && req.signedCookies.userId>0){
		res.redirect('/login');
	}
	else{
		next();
	}
}

module.exports = auth;
