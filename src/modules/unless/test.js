const unless = require('./unless.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function unless_test() {
  compose(
    () => expect(
      'unless test',
      null,
      unless(x => !Number.isNaN(x), x => x * 2 + 16 * 2 - 2 * 2)({} - 42)
    ),
    () => expect(
      'unless test',
      42,
      unless(x => !Number.isNaN(x), x => x * 2 + 16 * 2 - 2 * 2)(7)
    )
  )();
}

module.exports = unless_test;
