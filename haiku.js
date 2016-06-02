var fs = require("fs");

function createHaiku(haikuStructure, data) {
    var haiku = "";
    haikuStructure.forEach( function(numSyllables) {
        var line = _getSyllables(numSyllables);
        line.forEach( function(syl) {
            var validWords = data.filter(function(word) { return syl == word[2]; });
            var random = Math.floor(Math.random() * validWords.length) + 1;
            haiku += validWords[random] + " " + line + " ";
        })
        haiku += "\n";
    });
    return haiku;
}

function readCmudictFile(file) {
    return fs.readFileSync(file).toString();
}

function formatData(data) {
    var lines = data.toString().split("\n")
    var formatted = [];
    lines.forEach(function(line) {
        var lineSplit = line.split("  ");
        if (lineSplit[1]) {
            var numSyllables = lineSplit[1].split(" ").length;
            lineSplit.push(numSyllables);
        }
        formatted.push(lineSplit);
    });
    return formatted;
}

/*function _sortData(data) {
    var count = 0;
    var sortedData = [];
    while (data.length > 0) {
        count++;
        var sort = [];
        for (var i = 0; i < data.length; i++) {
            data[i].pop()
        };

    }
}*/

function _getSyllables(num) {
    // array to store syllables
    var syllables = [];
    // keep a count of the number of syllables we have
    var totalSyllables = 0;
    // hold the value of the largest number we want
    var max = num;

    while (totalSyllables < num) {
        // get a number between 1 (inclusive) and max (inclusive)
        var random = Math.floor(Math.random() * max) + 1;
        // add that number to syllables
        syllables.push(random);
        // get the number of syllables we have stored and update the count
        totalSyllables = syllables.reduce(function(a, b) { return a + b });
        // update max
        max = num - totalSyllables;
    }
    return syllables;
}

module.exports = {
    createHaiku: createHaiku,
    readCmudictFile: readCmudictFile,
    formatData: formatData,
};