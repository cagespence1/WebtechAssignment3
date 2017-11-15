var Express = require('express');
var router = Express.Router();
var JSONWebToken = require('jsonwebtoken');
var User = require('../models/user');

var privateKey = 'SuperSecretKey';

router.post('/', function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    if (!username) {

        error = new Error('Missing username');
        error.status = 400;
        throw error;

    }

    if (!password) {

        error = new Error('Missing password');
        error.status = 400;
        throw error;

    }

    // Find user
    var user = User.findByUsernameWithPassword(username)
        .then(function (user) {

            console.log(user);

            if (!user) {

                error = new Error('No user found');
                error.status = 404;
                throw error;

            }

            if (user.password !== password) {

                error = new Error('Wrong password');
                error.status = 401;
                throw error;

            } else {

                var token = JSONWebToken.sign({username: username}, privateKey,{
                    expiresIn: "1000 minutes"
                });
                res.status(200).json({username: username, token: token});

            }

        })

        .catch(function (err) {
            next(err);
        })

});

router.get('/', function(req, res, next){

    var token = req.headers.authorization;
    console.log(token);

    JSONWebToken.verify(token, privateKey, function (err, decoded) {

        if (err) {
            console.log('token bad');
            res.json('false');
            return;
        } else {
            console.log('token good');
            res.json('true');
            return;
        }

    })

});

module.exports = router;