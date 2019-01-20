const objectEntries = require('./object-entries.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function objectEntries_test() {
  expect(
    'objectEntries test',
    [['a', 'a value'], ['b', 'b value'], ['c', 'c value']],
    objectEntries({a: 'a value', b: 'b value', c: 'c value'})
  );
}

module.exports = objectEntries_test;
