const until = require('./until.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function until_test() {
  compose(
    () => expect(
      'until',
      128,
      until(x => x > 100, x => x * 2, 1)
    ),
    () => expect(
      'until',
      11,
      until(x => x > 10, x => x + 1, 0)
    )
  )();
}

module.exports = until_test;
