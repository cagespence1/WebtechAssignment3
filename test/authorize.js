
var supertest = require('supertest');
var should = require('should');

// test libraries
var server = supertest.agent('http://localhost:3000');

describe('Get an authorization token', function () {
    it('should return a token', function (done) {
        server
            .post('/api/authorize')
            .send({username:'dying_student', password : 'pass'})
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res){
                res.status.should.equal(200);
                done();
            })
    });
});

describe('Get an authorization token', function () {
    it('should give an error because of a missing username', function (done) {
        server
            .post('/api/authorize')
            .send({password : 'pass'})
            .expect('Content-type', /json/)
            .expect(400)
            .end(function(err, res){
                res.status.should.equal(400);
                done();
            })
    });
});

describe('Get an authorization token', function () {
    it('should give an error because of a missing password', function (done) {
        server
            .post('/api/authorize')
            .send({username : 'dying_student'})
            .expect('Content-type', /json/)
            .expect(400)
            .end(function(err, res){
                res.status.should.equal(400);
                done();
            })
    });
});

describe('Get an authorization token', function () {
    it('should not find the user', function (done) {
        server
            .post('/api/authorize')
            .send({username:'no_student', password : 'pass'})
            .expect('Content-type', /json/)
            .expect(404)
            .end(function(err, res){
                res.status.should.equal(404);
                done();
            })
    });
});

describe('Get an authorization token', function () {
    it('should give an error because the password is \'wrong\' (lol)', function (done) {
        server
            .post('/api/authorize')
            .send({username:'no_student', password : 'wrong'})
            .expect('Content-type', /json/)
            .expect(404)
            .end(function(err, res){
                res.status.should.equal(404);
                done();
            })
    });
});