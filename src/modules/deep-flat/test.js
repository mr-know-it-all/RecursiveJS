const deepFlat = require('./deep-flat.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function deepFlat_test() {
  compose(
    () => expect(
      'deepFlat test',
      [1, 2, 3, 4, 5, 6],
      deepFlat([1, [[[2]]], [[[[3]]]], [[[[[[[[[4]]]]]]]]], 5, 6])
    ),
    () => expect(
      'deepFlat test',
      [1, 2, 3, 4, 5],
      deepFlat([1, [[[2]]], [3], [[[[[4]]]]], 5])
    )
  )();
}

module.exports = deepFlat_test;
