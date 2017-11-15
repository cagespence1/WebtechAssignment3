var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    lastname: { type: String, required: true },
    middlename: { type: String, required: false },
    firstname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true, select: false }
});

UserSchema.statics.findAll = function (req, res, callback) {
    return this.find(
        {},
        callback)
        .exec(callback);
};

UserSchema.statics.findByUsername = function (username, callback) {
    return this.findOne({username: username})
        .exec(callback);
};

UserSchema.statics.findByUsernameWithPassword = function (username, callback) {
    return this.findOne({username: username})
        .select("+password")
        .exec(callback);
};

UserSchema.statics.add = function(req, res, user, callback){
    return this.create({lastname: "",
        middlename: "grdsfg",
        firstname: "",
        username: "g"},
        callback).exec(callback);
};

// todo check that the user is not a duplicate insert

UserSchema.path('lastname').validate(function (lastName) {
    return lastName !== undefined;
}, 'Missing lastname');

UserSchema.path('firstname').validate(function (firstName) {
    return firstName !== undefined;
}, 'Missing firstname');

UserSchema.path('username').validate(function (username) {
    return username !== undefined;
}, 'Missing username');

UserSchema.path('password').validate(function (password) {
    return password !== undefined;
}, 'Missing password');

module.exports = mongoose.model('User', UserSchema);