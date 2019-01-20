const allAnagrams = require('./all-anagrams.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function allAnagrams_test() {
  compose(
    () => expect('allAnagrams', ['ABC', 'ACB','BAC','BCA','CAB','CBA'], allAnagrams('ABC'))
  )();
}

module.exports = allAnagrams_test;
