const invoker = require('./invoker.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function invoker_test() {
  compose(
    () => expect('invoker test 3', 'ghijklm', invoker(1, 'slice')(6, 'abcdefghijklm')),
    () => expect('invoker test 2', 'gh', invoker(2, 'slice')(6)(8, 'abcdefghijklm')),
    () => expect('invoker test 1', '--cd', invoker(2, 'replace')('ab')('--')('abcd')),
    () => expect(
      'invoker test 1', 42,
      invoker(4, 'call')(
        {fn: (x, y, z) => x + y + z}, 39, 1, 2
      )(function(x, y, z) { return this.fn(x, y, z); })
    )
  )();
}

module.exports = invoker_test;
