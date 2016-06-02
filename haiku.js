var fs = require("fs");

function createHaiku(haikuStructure, syllabelsArr) {
    var haiku = "";
    haikuStructure.forEach( function(numSyllables) {
        var line = _getSyllables(numSyllables);
        

        line.forEach( function(syl) {
            var validWords = syllabelsArr[syl];
            var random = _randRange(0, validWords.length);
            haiku += validWords[random][0] + " ";
        })

        haiku += "\n";
    });
    haiku = haiku.replace(/\(\d\)/g, "");
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
        var numSyllables = lineSplit[1].split(" ").length;
        if (formatted[numSyllables] == undefined) {
            formatted[numSyllables] = [];
        }
        formatted[numSyllables].push(lineSplit);
    });
    return formatted;
}

function _getSyllables(num) {
    var syllables = [];
    var totalSyllables = 0;
    var max = num;

    while (totalSyllables < num) {
        // an attempt to recude the frequency of 1 syllable words
        // randomly generated poetry is hard
        if (syllables.length == 0) {
            var random = _randRange(2, max + 1)
            if (random == 5) {
                random = _randRange(2, 5)
            }
        } else {
            var random = _randRange(1, max + 1)
        }
        syllables.push(random);
        // get the number of syllables we have stored and update the count
        totalSyllables = syllables.reduce(function(a, b) { return a + b });
        max = num - totalSyllables;
    }
    return syllables;
}

// get random interger between min (inclusive) and max (exclusive)
function _randRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    createHaiku: createHaiku,
    readCmudictFile: readCmudictFile,
    formatData: formatData,
};