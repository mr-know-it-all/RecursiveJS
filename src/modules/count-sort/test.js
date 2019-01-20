const countSort = require('./count-sort.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function countSort_test() {
  expect('countSort', [2, 3, 4, 4, 5], countSort([4, 2, 5, 3, 4], [2, 5]));
  expect('countSort', [0, 1, 2, 3, 4, 5], countSort([4, 2, 1, 3, 0, 5], [0, 5]));
  expect('countSort', [15, 15, 16, 17, 18, 18, 19, 20], countSort([18, 18, 15, 16, 19, 20, 15, 17], [15, 20]));
}

module.exports = countSort_test;
