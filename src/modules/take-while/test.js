const takeWhile = require('./take-while.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function takeWhile_test() {
  expect('takeWhile', [1, 2, 3, 4, 5], takeWhile(x => x <= 5, [1, 2, 3, 4, 5, 6, 7]));
}

module.exports = takeWhile_test;
