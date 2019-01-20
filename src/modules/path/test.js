const path = require('./path.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function path_test() {
  compose(
    () => {
      expect(
        'path test', [42],
        path([0, 1, 2, 3, 4], [[[], [[], [], [[], [], [], [[], [], [], [], [42]]]]]])
      );
    },
    () => expect(
      'path test',
      undefined,
      path(['a', 'e', 'c', 'd'], {a: {b: {c: 42}}})
    ),
    () => expect(
      'path test',
      42,
      path(['a', 'b', 'c'], {a: {b: {c: 42}}})
    )
  )();
}

module.exports = path_test;
