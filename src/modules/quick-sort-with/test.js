const quickSortWith = require('./quick-sort-with.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function quickSortWith_test() {
  compose(
    () => expect(
      'quickSortWith test 1',
      [1, 2, 3, 4],
      quickSortWith((a, b) => a > b ? 1 : a < b ? -1 : 0, [2, 1, 4, 3])
    ),
    () => expect(
      'quickSortWith test 2',
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      quickSortWith((a, b) => a > b ? 1 : a < b ? -1 : 0, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
    ),
    () => expect(
      'quickSortWith test 3',
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      quickSortWith((a, b) => a > b ? 1 : a < b ? -1 : 0, [2, 9, 8, 1, 6, 5, 4, 3, 10, 7])
    ),
    () => expect(
      'quickSortWith test 4',
      ['a', 'b', 'c', 'd'],
      quickSortWith((a, b) => a > b ? 1 : a < b ? -1 : 0, ['d', 'a', 'c', 'b'])
    )
  )();
}

module.exports = quickSortWith_test;
