const converge = require('./converge.js');
const compose = require('../compose/compose.js');
const takeWhile = require('../take-while/take-while.js');
const deepFlat = require('../deep-flat/deep-flat.js');
const reduce = require('../reduce/reduce.js');
const take = require('../take/take.js');
const length = require('../length/length.js');
const { expect } = require('../../../tests/tests.js');

const isOdd = x => !isEven(x);
const isEven = x => x % 2 === 0;

function converge_test() {
  compose(
    () => expect(
      'converge test',
      3.5,
      converge(
        (x, y) => x / y, [
        xs => reduce((acc, v) => acc + v, xs, 0),
        length
      ])([1, 2, 3, 4, 5, 6])
    ),
    () => expect(
      'converge test', [1, 6, 21, 6],
      converge(
        (...args) => args, [
          xs => Math.min(...xs),
          xs => Math.max(...xs),
          xs => reduce((acc, v) => acc + v, xs, 0),
          length
        ])([1, 2, 3, 4, 5, 6])
    ),
    () => expect(
      'converge test', [1, 1, 2, 6],
      converge(
        (...args) => deepFlat(args), [
          xs => takeWhile(isOdd, xs),
          xs => take(2, xs),
          length
        ])([1, 2, 3, 4, 5, 6])
    )
  )();
}

module.exports = converge_test;
