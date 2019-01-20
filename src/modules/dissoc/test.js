const dissoc = require('./dissoc.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function dissoc_test() {
  expect(
    'dissoc test', {
      a: 1,
      b: 2,
      c: 3
    },
    dissoc('d', {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    })
  )
}

module.exports = dissoc_test;
