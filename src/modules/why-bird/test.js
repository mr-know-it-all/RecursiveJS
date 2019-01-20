const whyBird = require('./why-bird.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function whyBird_test() {
  compose(
    () => {
      const mapAddOne = (me, [x, ...xs], acc = []) => x === undefined ? acc : me(xs, [...acc, x + 1]);
      expect('whyBird test', [2, 3, 4, 5], whyBird(mapAddOne)([1, 2, 3, 4]));
    },
    () => {
      const length = (me, [x, ...xs], acc = 0) => x === undefined ? acc : me(xs, acc + 1);
      expect('whyBird test', 4, whyBird(length)([1, 2, 3, 4]));
    }
  )();
}

module.exports = whyBird_test;
