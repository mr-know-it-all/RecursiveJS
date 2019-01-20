const reduceWhile = require('./reduce-while.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

const largerThanTwo = x => x > 2;
const isInteger = x => Number.isInteger(x);

function reduceWhile_test() {
  const add = (x, y) => x + y;
  const reduceWhileList1 = [5, 4, 3, 2, 1];
  const reduceWhileList2 = [1, 2, 3, 4, 5, 'six', 7, 8];

  compose(
    () => expect(
      'reduceWhile',
      15,
      reduceWhile(isInteger, add, reduceWhileList2, 0)
    ),
    () => expect(
      'reduceWhile',
      12,
      reduceWhile(largerThanTwo, add, reduceWhileList1, 0)
    )
  )();
}

module.exports = reduceWhile_test;
