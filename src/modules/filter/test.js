const filter = require('./filter.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function filters_test() {
  expect('filter', [2, 4, 6], filter(x => x % 2 === 0, [1, 2, 3, 4, 5, 6]));
}

module.exports = filters_test;
