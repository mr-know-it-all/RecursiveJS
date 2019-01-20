const intersection = require('./intersection.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function intersection_test() {
  expect('intersection', [3, 4], intersection([4, 3, 1, 2, 3, 4, 3, 3], [7, 6, 5, 4, 3, 3]));
}

module.exports = intersection_test;
