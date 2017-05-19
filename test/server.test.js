'use strict';
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const request = require('supertest');
const app = require('./../app');

describe('End points', () => {
    describe('non existing end point', () => {
        it('get request should return 500', (done) => {
            request(app)
                .get('/getNumberzzzzz')
                .end(function(err, res){
                    expect(res.status).to.be.equal(500);
                    done();
                });
        });
        it('post request should return 500', (done) => {
            request(app)
                .post('/getNumberzzzz')
                .end(function(err, res){
                    expect(res.status).to.be.equal(500);
                    done()
                });
        });
    })
    describe('getNumber end point', () => {
        it('get request should return 500', (done) => {
            request(app)
                .get('/getNumber')
                .end(function(err, res){
                    expect(res.status).to.be.equal(500);
                    done();
                });
        });
        it('post request should return 500', (done) => {
            request(app)
                .post('/getNumber')
                .end(function(err, res){
                    expect(res.status).to.be.equal(500);
                    done()
                });
        });
        it('should return 200', (done) => {
            request(app)
                .post('/getNumber')
                .send({numerals: 'I'})
                .end(function(err, res){
                    expect(res.status).to.be.equal(200);
                    done();
                });
        });
        it('should RETURN number === 1', (done) => {
            request(app)
                .post('/getNumber')
                .send({numerals: 'I'})
                .end(function(err, res){
                    expect(res.body.number).to.be.equal(1);
                    done();
                });
        });
    });
    
    describe('getRoman end point', () => {
        it('should return 200', (done) => {
            request(app)
                .post('/getRoman')
                .send({number: 3999})
                .end(function(err, res){
                    expect(res.status).to.be.equal(200);
                    done();
                });
        });
        it('should RETURN romanChars === MMMCMXCIX', (done) => {
            request(app)
                .post('/getRoman')
                .send({number: 3999})
                .end(function(err, res){
                    expect(res.body.romanChars).to.be.equal('MMMCMXCIX');
                    done();
                });
        });
        it('get request should return 500', (done) => {
            request(app)
                .get('/getRoman')
                .end(function(err, res){
                    expect(res.status).to.be.equal(500);
                    done();
                });
        });
        it('post request should return 500', (done) => {
            request(app)
                .post('/getRoman')
                .end(function(err, res){
                    expect(res.status).to.be.equal(500);
                    done()
                });
        });
    });
    
});
