const mergeWith = require('./merge-with.js');
const compose = require('../compose/compose.js');
const concat = require('../concat/concat.js');
const curry = require('../curry/curry.js');
const { expect } = require('../../../tests/tests.js');

function mergeWith_test() {
  expect(
    'mergeWith test', {
      c: [1, 2, 3, 4],
      b: 2,
      a: 1
    },
    curry(mergeWith)(concat)(
      {c: [1, 2], a: 1},
      {c: [3, 4], b: 2}
    )
  );
}

module.exports = mergeWith_test;
