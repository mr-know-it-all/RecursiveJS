const length = require('./length.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function length_test() {
  expect('length', 5, length([1, 2, 3, 4, 5]));
}

module.exports = length_test;
