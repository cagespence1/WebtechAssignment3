var supertest = require('supertest');
var should = require('should');

// test libraries
var server = supertest.agent('http://localhost:3000');

var movie = require('../models/movie');

describe('Get all movies', function () {
    it('should get all movies', function (done) {
        server
            .get('/api/movies')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res){
                res.status.should.equal(200);
                done();
            })
    });
});

describe('Get a single movie using a tt_number', function () {
    it('should get The Hobbit', function (done) {
        server
            .get('/api/movies/1234')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res){
                res.status.should.equal(200);
                done();
            })
    });
});

describe('Get a single movie using a tt_number', function () {
    it('should not find any movies', function (done) {
        server
            .get('/api/movies/0000')
            .expect('Content-type', /json/)
            .expect(404)
            .end(function(err, res){
                res.status.should.equal(404);
                done();
            })
    });
});

