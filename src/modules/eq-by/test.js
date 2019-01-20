const eqBy = require('./eq-by.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function eqBy_test() {
  compose(
    () => expect('eqBy test 4', false, eqBy(x => Number(x), '421', 42)),
    () => expect('eqBy test 3', true, eqBy(x => Number(x), '42', 42)),
    () => expect('eqBy test 2', false, eqBy(Math.abs, 5, -51)),
    () => expect('eqBy test 1', true, eqBy(Math.abs, 5, -5))
  )();
}

module.exports = eqBy_test;
