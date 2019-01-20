const unfold = require('./unfold.js');
const compose = require('../compose/compose.js');
const range = require('../range/range.js');
const { expect } = require('../../../tests/tests.js');

function unfold_test() {
  compose(
    () => expect(
      'unfold test 2',
      [[0], [0, 1], [0, 1, 2], [0, 1, 2, 3]],
      unfold(x => x > 4 ? false : [range(0, x), x + 1], 1)
    ),
    () => expect(
      'unfold test 1',
      [-1, -2, -3, -4, -5],
      unfold(x => x > 5 ? false : [-x, x + 1], 1)
    )
  )();
}

module.exports = unfold_test;
