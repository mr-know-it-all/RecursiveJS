const kadane = require('./kadane.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function kadane_test() {
  let listA = [-4, 2, 3, -8, -9, 20, -12, 5, 8, 4, 5];
  let listB = [1, 2, 3, -9, 99, -101, 10, 2, -1, 10, 0]

  compose(
    () => expect('kadane', 99, kadane(listB)),
    () => expect('kadane', 30, kadane(listA))
  )();
}

module.exports = kadane_test;
