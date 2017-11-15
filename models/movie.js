var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    tt_number: {type: String, required: true},
    title: {type: String, required: true},
    publication_date: {type: Date, required: true},
    length: {type: Number, required: true},
    director: {type: String, required: true},
    description: {type: String, required: true},
    url: {type: String, required: true}
});

MovieSchema.statics.findAll = function (callback) {
    return this.find(
        {},
        callback)
        .exec(callback);
};

MovieSchema.statics.findByTtNumber = function (tt_number, callback) {
    return this.findOne(
        {tt_number: tt_number})
        .exec(callback);
};

MovieSchema.statics.createMovie = function (callback){
    this.create({}, function (err, movie){

    })
};

module.exports = mongoose.model('Movie', MovieSchema);