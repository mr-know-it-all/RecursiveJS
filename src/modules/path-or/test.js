const pathOr = require('./path-or.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function pathOrs_test() {
  compose(
    () => expect(
      'pathOr test',
      'N/A',
      pathOr('N/A', ['a', 'e', 'c', 'd'], {a: {b: {c: 42}}})
    ),
    () => expect(
      'pathOr test', [42],
      pathOr('N/A', [0, 1, 2, 3, 4], [[[],[[],[], [[], [], [], [[], [], [], [], [42]]]]]])
    )
  )();
}

module.exports = pathOrs_test;
