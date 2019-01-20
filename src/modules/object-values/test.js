const objectValues = require('./object-values.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function objectValues_test() {
  expect(
    'objectValues test',
    ['a value', 'b value', 'c value'],
    objectValues({a: 'a value', b: 'b value', c: 'c value'})
  );
}

module.exports = objectValues_test;
