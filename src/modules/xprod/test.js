const xprod = require('./xprod.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function xprod_test() {
  expect(
    'xprod test', [
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b']
    ],
    xprod([1, 2], ['a', 'b'])
  )
}

module.exports = xprod_test;
