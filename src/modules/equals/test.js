const equals = require('./equals.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function equals_test() {
  compose (
    () => expect('equals 1', true, equals(true, true)),
    () => expect('equals 2', false, equals(true, false)),
    () => expect('equals 3', false, equals(NaN, false)),
    () => expect('equals 4', false, equals(undefined, null)),
    () => expect('equals 5', false, equals(undefined, false)),
    () => expect('equals 6', false, equals(true, 1)),
    () => expect('equals 7', false, equals([], '')),
    () => expect('equals 8', false, equals({}, [])),
    () => expect('equals 9', false, equals({}, new Map())),
    () => expect('equals 10', false, equals([], new Set())),
    () => expect('equals 11', true, equals([1, 2, 3], [1, 3, 2])),
    () => expect('equals 11', false, equals([1, 2, 3], [1, 3, 2, 3])),
    () => expect('equals 12', 'to be continued', equals([1, 2, 3], [1, 3, 2, 3, 'a'])),
    () => expect('equals 13', true, equals(x => y => x + 1 - y, x => y => x + 1 - y)),
    () => expect('equals 14', false, equals(x => y => x + 1 - y, x => y => x + 2 - y))
  )();
}

module.exports = equals_test;
