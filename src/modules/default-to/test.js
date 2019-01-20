const defaultTo = require('./default-to.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function defaultTo_test() {
  compose(
    () => expect('defaultTo', 42, defaultTo(42)(NaN)),
    () => expect('defaultTo', '42', defaultTo(42)('42')),
    () => expect('defaultTo', NaN, defaultTo(NaN)(NaN))
  )();
}

module.exports = defaultTo_test;
