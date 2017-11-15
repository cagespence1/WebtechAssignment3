var express = require('express');
var JSONWebToken = require('jsonwebtoken');
var router = express.Router();
var privateKey = 'SuperSecretKey';

router.use(function (req, res, next) {

    // Get the token from the request header
    var token = req.headers.authorization || req.body.authorization;
    console.log('path ' + req.path.split('/')[1]);

    // Check all requests except post user & authorize, get movies
    if ((req.method === 'POST' && req.path === '/users' || req.path === '/authorize') ||
        (req.method === 'GET' && req.path === '/movies' || req.path.split('/')[1] === 'posters')) {
        next();
        return;
    }

    // Verify the token
    JSONWebToken.verify(token, privateKey, function (err, decoded) {

        if (err) {
            error = new Error(err.message);
            error.status = 400;
            throw error;
        } else {
            console.log('Token verified');
            req.token = decoded;
            next();
        }

    })

});

module.exports = router;