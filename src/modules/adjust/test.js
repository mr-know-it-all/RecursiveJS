const adjust = require('./adjust.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function adjust_test() {
  compose(
    () => expect('adjust test 4', [1, 2, null, 4, 5], adjust(_ => null, 2, [1, 2, 3, 4, 5])),
    () => expect('adjust test 3', [1, 2, {}, 4, 5], adjust(_ => ({}), 2, [1, 2, 3, 4, 5])),
    () => expect('adjust test 2', [1, 2, [1, 2, 3], 4, 5], adjust(_ => [1, 2, 3], 2, [1, 2, 3, 4, 5])),
    () => expect('adjust test 1', [1, 2, 6, 4, 5], adjust(x => x + 3, 2, [1, 2, 3, 4, 5]))
  )();
}

module.exports = adjust_test;
