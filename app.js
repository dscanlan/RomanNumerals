const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

const server = require('./server');
const roman = require('./roman');

app.use(bodyParser.json({ limit: '5mb' })); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    limit: '5mb', // to support URL-encoded bodies
    extended: true
}));

app.post('/getNumber', (req, res) => {
    //check that we have numerals
    if (!req.body.numerals) {
        return res.status(500).send('Please enter a string');
    }

    //check that what we have isn't a number
    if (!isNaN(req.body.numerals)) {
        return res.status(500).send('Please enter Roman numerals');
    }

    //check that numeral is greater than 0
    if(req.body.numerals.length === 0) {
        return res.status(500).send('Please enter Roman numerals');
    }

    //call getNumber
    const number = roman.getNumber(req.body.numerals);

    //return number
    res.json({ number }).status(200);
});

app.post('/getRoman', (req, res) => {
    //check that you have number
    if(!req.body.number) {
        return res.status(500).send('Number must be between 1 and 3999');
    }

    //check that we actually have a number
    if(isNaN(req.body.number)) {
        return res.status(500).send('Number must be between 1 and 3999');
    }
    
    //only checking values between 1 and 3999
    if (number < 1 || number > 3999) {
        return res.status(500).send('Number must be between 1 and 3999');
    }

    //call roman.getChars
    const romanChars = roman.getChars(req.body.number);

    //send the characters back to requestor.
    res.json({ romanChars }).status(200);
});

// console.log('1111',roman.getChars(1111));
// console.log('10',roman.getChars(10));
// console.log('100',roman.getChars(100));
// console.log('9',roman.getChars('9'));
// console.log('1900',roman.getChars('1900'));
// console.log('3999',roman.getChars('3999'));
// console.log('39a9',roman.getChars('39a9'));

// console.log('1', roman.getNumber('I'));
// console.log('MMMCMXCIX', roman.getNumber('MMMCMXCIX'));
// console.log('23', roman.getNumber('23'));
// console.log('A', roman.getNumber('A'));
console.log('XIIII', roman.getNumber('XIIII'))

server(app);
