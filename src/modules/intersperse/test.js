const intersperse = require('./intersperse.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function intersperse_test() {
  expect('intersperse', [1, '#', 2, '#', 3, '#', 4], intersperse('#', [1, 2, 3, 4]));
}

module.exports = intersperse_test;
