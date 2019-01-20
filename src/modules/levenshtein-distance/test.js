const levenshteinDistance = require('./levenshtein-distance.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function levenshteinDistance_test() {
  compose(
    () => expect('levenshteinDistance test', 3, levenshteinDistance('saturday', 'sunday'))
  )();
}

module.exports = levenshteinDistance_test;
