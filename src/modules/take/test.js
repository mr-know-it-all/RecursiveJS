const take = require('./take.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function take_test() {
  expect('take', [1, 2, 3], take(3, [1, 2, 3, 4, 5, 6, 7]));
}

module.exports = take_test;
