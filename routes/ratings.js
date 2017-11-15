var express = require('express');
var Rating = require('../models/rating');
var router = express.Router();

function getAverageRating(ratings) {
    var total = 0;
    for (var i = 0;  i < ratings.length; i++){
        total += ratings[i].rating;
    }
    return total/ratings.length;
}

/**
 * Find average rating for a movie
 */
router.get('/:tt_number', function (req, res, next) {

    Rating.findByTtNumber(req.params.tt_number)

        .then(function (ratings) {
            console.log("ratings",ratings);

            if (!ratings || ratings.length === 0) {

                // var error = new Error("No ratings for this movie");
                // error.status = 404;
                // throw error;

                res.json({tt_number: req.params.tt_number, rating: 0});
                return;
            }

            var average = getAverageRating(ratings);

            res.json({tt_number: req.params.tt_number, rating: average});
            return;
        })

        .catch(function (error) {
            next(error);
        })
});

/**
 * Find users rating for a movie
 */
router.get('/:tt_number/:username', function (req, res, next) {
    getUserRating(req, res, next);
});

/**
 * Add a rating for a movie
 */
router.post('/', function (req, res, next) {

    Rating.findUserRating(req.body.tt_number, req.body.username)

        .then(function (rating) {

            if (rating) {

                error = new Error("Rating already exists");
                error.status = 409;
                throw error;

            } else {

                rating = new Rating({
                    username: req.body.username,
                    tt_number: req.body.tt_number,
                    rating: req.body.rating
                });

                rating.validateSync();

                res.status(201);
                res.json({username: req.body.username, tt_number: req.body.tt_number});

                return rating.save();

            }

        })

        .catch(function (error) {
            next(error);
        })

});

/**
 * Update a rating for a movie
 */
router.put('/', function (req, res, next) {
    updateRating(req, res, next);
});

var getUserRating = function (req, res, next) {
    Rating.findUserRating(req.params.tt_number, req.params.username)

        .then(function (rating) {

            if (!rating) {

                var error = new Error("No rating found");
                error.status = 404;
                throw error;

            }

            res.json(rating);
        })

        .catch(function (error) {
            next(error);
        })
};

var updateRating = function (req, res, next) {
    Rating.findUserRating(req.body.tt_number, req.body.username)

        .then(function (rating) {

            if (!rating) {

                error = new Error("Cannot update non-existent rating");
                error.status = 404;
                throw error;

            } else {

                if (!req.body.rating) {
                    error = new Error("Missing rating");
                    error.status = 404;
                    throw error;
                }

                rating.set({rating: req.body.rating});

                res.status(200);
                res.json({username: req.body.username, tt_number: req.body.tt_number});

                return rating.save();

            }

        })

        .catch(function (error) {
            next(error);
        })
};

module.exports = router;
