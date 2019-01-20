const symetricDifference = require('./symetric-difference.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function symetricDifference_test() {
  expect(
    'symetricDifference', [1, 2, 7, 6, 5, 42],
    symetricDifference([1, 2, 3, 4], [7, 6, 5, 4, 3, 42])
  );
}

module.exports = symetricDifference_test;
