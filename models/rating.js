var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Movie = require('../models/movie');
var User = require('../models/user');

var RatingSchema = new Schema({
    tt_number: {type: String, required: true},
    username: {type: String, required: true},
    rating: {
        type: Number,
        min: [0.5, 'Rating too low'],
        max: [5.0, 'Rating too high'],
        required: true
    }
});

/**
 * Find a rating by a movie's tt_number
 * @param tt_number
 * @param callback
 * @returns {Promise<T>}
 */
RatingSchema.statics.findByTtNumber = function (tt_number, callback) {
    return this.find({tt_number: tt_number}).exec(callback);
};

/**
 * Find a user rating
 * @param tt_number
 * @param username
 * @param callback
 * @returns {Promise<T>}
 */
RatingSchema.statics.findUserRating = function (tt_number, username, callback) {
    if (!tt_number) {
        error = new Error('Missing tt_number');
        error.status = 400;
        throw error;
    }

    if (!username) {
        error = new Error('Missing username');
        error.status = 400;
        throw error;
    }

    return this.findOne({tt_number: tt_number, username: username}).exec(callback);
};

/**
 * Find a user rating and update it with a new value
 * @param ratingId the ID of the rating to be updated
 * @param ratingValue the value that the rating should be updated to
 * @param callback
 * @returns {Promise<null|null|T>}
 */
RatingSchema.statics.updateUserRating = function (ratingId, ratingValue, callback) {
    return this.findByIdAndUpdate(this.findById(ratingId), ratingValue).exec(callback);
};

RatingSchema.statics.deleteRating = function (ratingId, callback){
    return this.findByIdAndRemove(ratingId).exec(callback);
};

/**
 * Ensure the rating is incremented by 0.5
 */
RatingSchema.path('rating').validate(function (rating) {
    return (
        rating % .5 === 0
    )
}, 'Rating value must be incremented by .5');

/**
 * Ensure a tt_number is specified
 */
RatingSchema.path('tt_number').validate(function (tt_number) {
    return tt_number !== undefined;
}, 'Missing tt_number');

/**
 * Ensure a username is specified
 */
RatingSchema.path('username').validate(function (username) {
    return username !== undefined;
}, 'Missing username');

module.exports = mongoose.model('Rating', RatingSchema);