const swap = require('./swap.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function swap_test() {
  let swapList = [1, 2, 3, 4, 5, 6];
  compose(
    () => expect('swapList test', [6, 2, 3, 4, 5, 1], swap(swapList, 0, 42)),
    () => expect('swapList test', [1, 3, 2, 4, 5, 6], swap(swapList, 1, 2)),
    () => expect('swapList test', [1, 6, 3, 4, 5, 2], swap(swapList, 1, 5)),
    () => expect('swapList test', [6, 2, 3, 4, 5, 1], swap(swapList, 0, 5))
  )();
}

module.exports = swap_test;
