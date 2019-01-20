const applyTo = require('./apply-to.js');
const compose = require('../compose/compose.js');
const filter = require('../filter/filter.js');
const { expect } = require('../../../tests/tests.js');

function applyTo_test() {
  compose(
    () => expect('applyTo test 1', [1, 2, 3, 4, 5], applyTo([1, 2, 3, 4, 5, 6, 7])(xs => filter(x => x < 6, xs))),
    () => expect('applyTo test 1', 42, applyTo(30)(x => x + 12))
  )();
}

module.exports = applyTo_test;
