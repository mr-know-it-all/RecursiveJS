const Ycombinator = require('./y-combinator.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function Ycombinator_test() {
  compose(
    () => {
      const length = me => ([x, ...xs]) => x === undefined ? 0 : 1 + me(xs);
      expect('Ycombinator test', 4, Ycombinator(length)([1, 2, 3, 4]));
    }
  )();
}

module.exports = Ycombinator_test;
