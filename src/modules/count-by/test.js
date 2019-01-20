const countBy = require('./count-by.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function countBy_test() {
  compose(
    // ramdajs examples
    () => {
      const letters = ['a', 'b', 'A', 'a', 'B', 'c'];
      expect('countBy test 2', {'a': 3, 'b': 2, 'c': 1}, countBy(l => l.toLowerCase())(letters));
    },
    () => {
      const numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
      expect('countBy test 1', {'1': 3, '2': 2, '3': 1}, countBy(Math.floor)(numbers));
    }
  )();
}

module.exports = countBy_test;
