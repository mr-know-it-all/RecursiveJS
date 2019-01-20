const drop = require('./drop.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function drop_test() {
  compose(
    ([data]) => {
      expect('drop', 'cd', drop(2, data));
    },
    data => {
      const expected = ['abcd'];
      expect('drop', expected, drop(2, data));

      return expected;
    },
    data => {
      const expected = [6, 7, 'abcd'];
      expect('drop', expected, drop(2, data));

      return expected;
    },
    data => {
      const expected = [4, 5, 6, 7, 'abcd'];
      expect('drop', expected, drop(2, data));

      return expected;
    }, () => {
      const expected = [2, 3, 4, 5, 6, 7, 'abcd'];
      expect('drop', expected, drop(1, [1, ...expected]));

      return expected;
    }
  )();
}

module.exports = drop_test;
