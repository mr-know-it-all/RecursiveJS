const nPermutations = require('./n-permutations.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

let numsA = [
  [1,1,1],
  [1,1,2],
  [1,1,3],
  [1,2,1],
  [1,2,2],
  [1,2,3],
  [1,3,1],
  [1,3,2],
  [1,3,3],
  [2,1,1],
  [2,1,2],
  [2,1,3],
  [2,2,1],
  [2,2,2],
  [2,2,3],
  [2,3,1],
  [2,3,2],
  [2,3,3],
  [3,1,1],
  [3,1,2],
  [3,1,3],
  [3,2,1],
  [3,2,2],
  [3,2,3],
  [3,3,1],
  [3,3,2],
  [3,3,3]
];

let numsB = [
  [1, 1],
  [1, 2],
  [1, 3],
  [2, 1],
  [2, 2],
  [2, 3],
  [3, 1],
  [3, 2],
  [3, 3]
];

function nPermutations_test() {
  compose(
    () => expect('nPermutations', [[1], [2], [3]], nPermutations(1)([1, 2, 3])),
    () => expect('nPermutations', numsA, nPermutations(3)([1, 2, 3])),
    () => expect('nPermutations', numsB, nPermutations(2)([1, 2, 3]))
  )();
}

module.exports = nPermutations_test;
