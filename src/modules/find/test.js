const find = require('./find.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function find_test() {
  compose(
    () => expect('find', false, find(x => x === 42, [1, 2, 3, 4, 16])),
    () => expect('find', 4, find(x => x === 4, [1, 2, 3, 4]))
  )();
}

module.exports = find_test;
