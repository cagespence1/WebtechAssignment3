var express = require('express');
var Movie = require('../models/movie');
var router = express.Router();

/**
 * Find all movies
 */
router.get('/', function (req, res, next) {

    Movie.findAll()

        .then(function (movies) {
            res.json(movies);
        })

        .catch(function (error) {
            next(error);
        })
});

/**
 * Find movie by ttnumber
 */
router.get('/:tt_number', function (req, res, next) {

    Movie.findByTtNumber(req.params.tt_number)

        .then(function (movie) {

            if (!movie) {
                error = new Error('No movie found');
                error.status = 404;
                throw error;
            }

            res.json(movie);
        })

        .catch(function (error) {
            next(error);
        })
});

/**
 * Temporary method to allow for filling the database
 */
router.post('/', function (req, res, next) {

    movie = new Movie({
        title: req.body.title,
        tt_number: req.body.tt_number,
        length: req.body.length,
        director: req.body.director,
        description: req.body.description,
        publication_date: req.body.publication_date,
        url: req.body.url
    });

    movie.validateSync();

    res.status(201);
    res.json({tt_number: req.body.tt_number});

    return movie.save();

});

module.exports = router;