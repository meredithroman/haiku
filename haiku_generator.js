var haiku = require('./haiku');

var cmudictFile = haiku.readCmudictFile('./cmudict.txt');

var syllabelsArr = haiku.formatData(cmudictFile);


console.log(haiku.createHaiku([7, 5, 7], syllabelsArr))
