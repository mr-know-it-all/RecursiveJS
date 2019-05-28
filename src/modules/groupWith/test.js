const groupWith = require('./group-with.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function groupWith_test() {
  // ramda js examples
  const groupingFnA = (a, b) => a + 1 === b;
  const dataA = [0, 1, 1, 2, 3, 5, 8, 13, 21];
  const resultA = [[0, 1], [1, 2, 3], [5], [8], [13], [21]];

  const groupingFnB = (a, b) => a % 2 === b % 2;
  const dataB = [0, 1, 1, 2, 3, 5, 8, 13, 21];
  const resultB = [[0], [1, 1], [2], [3, 5], [8], [13, 21]];

  compose(
    () => expect('groupWith test A', resultA, groupWith(groupingFnA, dataA)),
    () => expect('groupWith test B', resultB, groupWith(groupingFnB, dataB))
  )();
}

module.exports = groupWith_test
