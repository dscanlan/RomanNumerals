'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should;
var roman = require('./../roman.js');

describe('roman numercy parse', () => {
    describe('getNumber function', () => {
        it('should not check if no string sent', (done) => {
            const result = roman.getNumber();
            expect(result).to.be.equal('String length must be at least 1 character');
            done();
        });
        it('should not check if a number sent', (done) => {
            const result = roman.getNumber(1);
            expect(result).to.be.equal('Only String Allowed');
            done();
        });
        it('should handle lowercase (iii)', (done) => {
            const result = roman.getNumber('iii');
            expect(result).to.be.equal(3);
            done();
        });
        it('should handle Uppercase (XXX)', (done) => {
            const result = roman.getNumber('XXX');
            expect(result).to.be.equal(30);
            done();
        });
        it('MMMCMXCIX should return 3999', (done) => {
            const result = roman.getNumber('MMMCMXCIX');
            expect(result).to.be.equal(3999);
            done();
        });
        it('XIIII should return 14', (done) => {
            const result = roman.getNumber('XIIII');
            expect(result).to.be.equal(14);
            done();
        });
        it('XIV should return 14', (done) => {
            const result = roman.getNumber('XIV');
            expect(result).to.be.equal(14);
            done();
        });
        it('AAAA should return 0', (done) => {
            const result = roman.getNumber('AAAA');
            expect(result).to.be.equal(0);
            done();
        });
    });
    describe('getChars function', () => {
        it('should not check numbers under 1', (done) => {
            const result = roman.getChars(-1);
            expect(result).to.be.equal('Only Numbers between 1 and 3999');
            done();
        });
        it('should not check numbers over 3999', (done) => {
            const result = roman.getChars(4000);
            expect(result).to.be.equal('Only Numbers between 1 and 3999');
            done();
        });
        it('should only check numbers', (done) => {
            const result = roman.getChars('40s0');
            expect(result).to.be.equal('NOT A NUMBER');
            done();
        });
        it('should only test numbers of 4 characters', (done) => {
            const result = roman.getChars(399934);
            expect(result).to.be.equal('Only Numbers between 1 and 3999');
            done();
        });
        it('should return MMMCMXCIX for 3999', (done) => {
            const result = roman.getChars(3999);
            expect(result).to.be.equal('MMMCMXCIX');
            done();
        });
        it('should return I for \'0001\'', (done) => {
            const result = roman.getChars('0001');
            expect(result).to.be.equal('I');
            done();
        });
        it('should return I for 1', (done) => {
            const result = roman.getChars(1);
            expect(result).to.be.equal('I');
            done();
        });
    });
});