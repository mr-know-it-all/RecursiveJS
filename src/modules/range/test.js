const range = require('./range.js');
const compose = require('../compose/compose.js');
const reduce = require('../reduce/reduce.js');
const { expect } = require('../../../tests/tests.js');

const sum = xs => reduce((acc, v) => acc + v, xs, 0);

function range_test() {
  compose(
    () => expect('range test 3', 7626, sum(range(1, 124))),
    () => expect('range test 2', [1, 2, 3, 4, 5], range(1, 6)),
    () => expect('range test 1', [51, 52, 53, 54, 55], range(51, 56))
  )();
}

module.exports = range_test;
