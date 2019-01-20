const concat = require('./concat.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function concat_test() {
  compose(
    () => expect(
      'concat test', [1, 2, 3, 4],
      concat([1, 2], [3, 4])
    ),
    () => expect(
      'concat test', [1, 2, 3, 4],
      concat([1, 2, 3], 4)
    )
  )();
}

module.exports = concat_test;
