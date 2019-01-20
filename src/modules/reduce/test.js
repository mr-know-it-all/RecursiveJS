const reduce = require('./reduce.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function reduce_test() {
  expect('reduce', 15, reduce((acc, v) => acc + v, [1, 2, 3, 4, 5], 0));
}

module.exports = reduce_test;
