var supertest = require('supertest');
var should = require('should');

// test libraries
var server = supertest.agent('http://localhost:3000');

var movie = require('../models/user');

describe('Get all users', function () {
    it('should get all users', function (done) {
        server
            .get('/api/users')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res){
                res.status.should.equal(200);
                done();
            })
    });
});

describe('Get a single user using a username', function () {
    it('should get a single user', function (done) {
        server
            .get('/api/users')
            .send({username:'dying_student'})
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res){
                res.status.should.equal(200);
                done();
            });
    });
});

describe('Get a single user using a username', function () {
    it('should not find a user', function (done) {
        server
            .get('/api/users')
            .send({username:'no_student'})
            .expect('Content-type', /json/)
            .expect(404)
            .end(function(err, res){
                res.status.should.equal(200);
                done();
            })
    });
});

describe('register a user', function () {
    it('should successfully register a user', function (done) {
        server
            .post('/api/users')
            .send({firstname: 'First', middlename : 'Middle', lastname : 'Last', username:'new_student', password : 'pass'})
            .expect('Content-type', /json/)
            .expect(201)
            .end(function(err, res){
                res.status.should.equal(201);
                done();
            });
    });
});

describe('register a user', function () {
    it('should be unsuccessful in registering (duplicate username)', function (done) {
        server
            .post('/api/users')
            .send({firstname: 'First', middlename : 'Middle', lastname : 'Last', username:'dying_student', password : 'pass'})
            .expect('Content-type', /json/)
            .expect(409)
            .end(function(err, res){
                res.status.should.equal(409);
                done();
            })
    });
});

describe('register a user', function () {
    it('should be unsuccessful in registering (missing username)', function (done) {
        server
            .post('/api/users')
            .send({firstname: 'First', middlename : 'Middle', lastname : 'Last', password : 'pass'})
            .expect('Content-type', /json/)
            .expect(400)
            .end(function(err, res){
                res.status.should.equal(400);
                done();
            })
    });
});

describe('register a user', function () {
    it('should be unsuccessful in registering (missing password)', function (done) {
        server
            .post('/api/users')
            .send({firstname: 'First', middlename : 'Middle', lastname : 'Last', username: 'new_student'})
            .expect('Content-type', /json/)
            .expect(400)
            .end(function(err, res){
                res.status.should.equal(400);
                done();
            })
    });
});