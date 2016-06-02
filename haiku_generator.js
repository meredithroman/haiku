var haiku = require('./haiku');

var cmudictFile = haiku.readCmudictFile('./cmudict.txt');

var formatted = haiku.formatData(cmudictFile);

console.log(haiku.createHaiku([7, 5, 7], formatted))