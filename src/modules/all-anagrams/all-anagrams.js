const length = require('../length/length.js');
const take = require('../take/take.js');
const drop = require('../drop/drop.js');

// allAnagrams :: String -> [String]
function allAnagrams(word) {
  let acc = [];
  (function allAnagrams(word, anagram = '') {
    if(length(word) === 0) { acc = [...acc, anagram]; return; }
    (function forEachLetter(word, index = 0) {
      if(length(word) - 1 < index) return;
      let wordMinusCurrentLetter = ([...take(index, word), ...drop(index + 1, word)]).join('');
      let anagramPlusCurrentLetter = `${anagram}${word[index]}`;

      allAnagrams(wordMinusCurrentLetter, anagramPlusCurrentLetter);
      return forEachLetter(word, index + 1);
    })(word);
  })(word);
  return acc;
}

module.exports = allAnagrams;