const transpose = require('./transpose.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function transpose_test() {
  compose(
    () => expect('transpose test 3', [[10, 20, 30], [11, 31], [32]], transpose([[10, 11], [20], [], [30, 31, 32]])), // ramdajs example
    () => expect('transpose test 2', [[1, 'a'], [2, 'b'], [3, 'c']], transpose([[1, 2, 3], ['a', 'b', 'c']])), // ramdajs example
    () => expect('transpose test 1', [[1, 2, 3], ['a', 'b', 'c']], transpose([[1, 'a'], [2, 'b'], [3, 'c']])), // ramdajs example
    () => expect('transpose test 1', [[1, 2, 3], ['a', 'b', 'c'], [11, 12, 13]], transpose([[1, 'a', 11], [2, 'b', 12], [3, 'c', 13]]))
  )();
}

module.exports = transpose_test;
