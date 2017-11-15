var express = require('express');
var User = require('../models/user');
var router = express.Router();

/**
 * Find all users
 */
router.get('/', function (req, res, next) {

    // Pass empty object to the query to get all documents
    User.findAll(req, res)

        .then(function (users) {
            res.json(users);
        })

        .catch(function (error) {
            console.log(error);
            next(error);
        })
});

/**
 * Find a user by their username
 */
router.get('/:username', function (req, res, next) {

    User.findByUsername(req.params.username)

        .then(function (user) {
            if (!user) {

                var error = new Error('No user found');
                error.status = 404;
                throw error;

            }

            res.json(user);

        })

        .catch(function (error) {
            next(error);
        })
});

/**
 * Register a user
 */
router.post('/', function (req, res, next) {

    var lastname = req.body.lastname;
    var middlename = req.body.middlename;
    var firstname = req.body.firstname;
    var username = req.body.username;
    var password = req.body.password;

    // Check if the user already exists
    User.findByUsername(username)

        .then(function (user) {
            if (user) {

                // Throw an error
                var error = new Error("User with that username already exists");
                error.status = 409;
                throw error;

            }

            // If he doesn't, create a new user
            user = new User;
            user.lastname = lastname;
            user.middlename = middlename;
            user.firstname = firstname;
            user.username = username;
            user.password = password;

            // Check if the fields are valid
            var validation = user.validateSync();
            if (validation) {

                // Throw an error
                error = new Error(validation);
                error.status = 400;
                throw error;

            }

            res.status(201);
            res.json({username: user.username});

            //Save the user
            return user.save();

        })

        // Handle errors
        .catch(function (error) {
            next(error);
        });
});

module.exports = router;