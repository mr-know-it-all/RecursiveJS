const reverse = require('./reverse.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function reverse_test() {
  expect('reverse', [3, 2, 1], reverse([1, 2, 3]));
}

module.exports = reverse_test;
