const tap = require('./tap.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function tap_test() {
  compose(
    () => expect('tap test 1', 42, tap(x => x + 2, 42)),
    () => expect('tap test 2', {a: 2}, tap(x => {x.a = 2}, {a: 1}))
  )();
}

module.exports = tap_test;
