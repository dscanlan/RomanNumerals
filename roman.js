const _ = require('lodash');

//already known symbols and values;
const symbols = [
    { symbol: 'I', value: 1},
    { symbol: 'IV', value: 4},
    { symbol: 'V', value: 5},
    { symbol: 'IX', value: 9},
    { symbol: 'X', value: 10},
    { symbol: 'XL', value: 40},
    { symbol: 'L', value: 50},
    { symbol: 'XC', value: 90},
    { symbol: 'C', value: 100},
    { symbol: 'CD', value: 400},
    { symbol: 'D', value: 500},
    { symbol: 'CM', value: 900},
    { symbol: 'M', value: 1000}
]

const roman = {
    getNumber: (numerals) => {
        //number to return
        let number = 0;

        //check that we have something to test.
        if (numerals === undefined) {
            return 'String length must be at least 1 character';
        }

        //checked that we haven't been sent a number.
        if(!isNaN(numerals)) {
            //number has been passed to array. return
            return 'Only String Allowed';
        }

        //split the string into array of characters and change to uppercase.
        const characters = numerals.toUpperCase().split("");

        //loop over the array.
        for (let index = 0; index <= characters.length -1; index++) {

            //some predefined symbols are 2 characters.
            //check that our string is at least 2 characters left in the string
            //form the current position
            if (index + 1 <= (characters.length -1)) {

                //we have 2 characters. see if its in the symbols array.
                const value = returnNumber(characters[index] + characters[index+1]);
                
                //ternary check that value greater than 0, otherwise get the symbol of the first character.
                number = number + parseInt(value > 0 ? value : returnNumber(characters[index]), 10);

                //if we have found a symbol in array using 2 characters, jump over the next position.
                index = value > 0 ? index + 1 : index;

                //continue to next item in array.
                continue;
            }

            //We have only 1 character left so find that value.
            number = number + parseInt(returnNumber(characters[index]), 10);
        }

        return number;
    },
    getChars : (number) => {
        //string to return
        let chars = '';

        //in case this is used in console app.
        //check that we have a number
        if(isNaN(number)) {
            //its not return empty string.
            return 'NOT A NUMBER';
        }

        //only test numbers between 1 and 3999
        if (number < 1 || number > 3999) {
            return 'Only Numbers between 1 and 3999'
        }
        
        //used to pad out the length if number is less than 4 characters
        const pad = "0000"
        const padded = pad.substring(0, pad.length - number.toString().length) + number.toString();

        //put into seperate array.
        const numbers = padded.split("");

        //using for to know what pos number is at (if its 0, 00, 000, or 0000)
        for (let pos = 0; pos <= numbers.length -1; pos++) {
            //check that first character is 0. just move on.
            if ( numbers[pos] === '0') {
                continue;
            }

            //call function to find the symbol(s) for the number. pass position so that we can check the predefined values in symbols array.
            chars += subtractCharacter(numbers[pos], pos);
        }
        return chars;
    }
}

const returnNumber = (n) => {
    //using lodash to find the value in symbols array. 
    //filter returns an array.
    //map over the array of 1 value
    //set as const value
    //could have used _.filter(symbols, { value: n })[0];
    const value =  _(symbols)
    .filter(s => s.symbol === n)
    .map('value')
    .value()[0];

    //if we have a value return it, otherwise return 0.
    return value ? value : 0;
}

const returnSymbol = (n) => {
    //using lodash to find the value in symbols array. 
    //filter returns an array.
    //map over the array of 1 value
    //return the value.
    //could have used _.filter(symbols, { value: n })[0];
    return _(symbols)
    .filter(s => s.value === n)
    .map('symbol')
    .value();
}

const subtractCharacter = (n, pos) => {
    //number is used when checked symbols array. in switch use position 
    // 0-3. left to right to ensure correct number is checked
    let number = 0;

    //is the character to loop over (e.g. I for 3 === III)
    let characterToLoop = '';

    // if we don't have number in symbols then number of times to add characterToLoop
    let numberForLoop = 0;
    
    //string to return
    let chars = '';

    switch (pos) {
        case 0:
            number = parseInt(n + '000', 10);
            //not checking any symbols over 1000 so looping 'M' n times. IF n !== 1000
            numberForLoop = n;
            // character to loop over.
            characterToLoop = returnSymbol(1000);
            break;
        case 1:
            number = parseInt(n + '00', 10);
            numberForLoop = n;
            //500 is a predefined charcter. 
            if(number > 500) {
                //if n is greater than 500. then we want to add 500 character.
                chars += returnSymbol(500);
                //want to loop over characterToLoop n - 5 (as we've already got char for 500)
                numberForLoop = n - 5;
            }
            // character to loop over.
            characterToLoop = returnSymbol(100);
            break;
        case 2:
            number = parseInt(n + '0', 10);
            numberForLoop = n;
            //50 is a predefined charcter. 
            if(number > 50) {
                //if n is greater than 50. then we want to add 50 character.
                chars += returnSymbol(50);
                //want to loop over characterToLoop n - 5 (as we've already got char for 50)
                numberForLoop = n - 5;
            }
            // character to loop over.
            characterToLoop = returnSymbol(10);
            break;
        case 3:
            number = parseInt(n, 10);
            numberForLoop = n;
            //5 is a predefined charcter. 
            if(number > 5) {
                //if n is greater than 5. then we want to add 5 character.
                chars += returnSymbol(5);
                //want to loop over characterToLoop n - 5 (as we've already got char for 5)
                numberForLoop = n - 5;
            }
            // character to loop over.
            characterToLoop = returnSymbol(1);
            break;
    }

    //check the predefined numbers in symbols array.
    // if found will return the character in the switch
    switch(number){
        case 1:
        case 4:
        case 5:
        case 9: 
        case 10:
        case 40:
        case 50:
        case 90:
        case 100:
        case 400:
        case 500:
        case 900:
        case 1000:
            return returnSymbol(number);
    }

    //loop over characterToLoop 
    //example of this could be 7 === VII
    // chars already set to V
    //loop of "I" 2 times.
    for(let loop = 1; loop <= numberForLoop; loop++) {
        chars += characterToLoop;
    }

    return chars;
}

module.exports = roman;