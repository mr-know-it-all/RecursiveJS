const union = require('./union.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function union_test() {
  compose(
    () => expect(
      'union test 2',
      ['a', 'b', 'c', 'd', 'e', 'f'],
      union(['a', 'b', 'c','b', 'c', 'd', 'd'], ['e', 'f', 'e', 'f', 'e', 'f'])
    ),
    () => expect(
      'union test 1',
      [1, 2, 3, 4, 5],
      union([1, 2, 2, 3, 3], [1, 2, 2, 3, 4, 5, 4])
    )
  )();
}

module.exports = union_test;
