const dropRepeatsWith = require('./drop-repeats-with.js');
const compose = require('../compose/compose.js');
const map = require('../map/map.js');
const curry = require('../curry/curry.js');
const { expect } = require('../../../tests/tests.js');

function dropRepeatsWith_test() {
  compose(
    () => {
      let computations = [x => x - 1, x => x - 1, x => x * 1, x => x * 1, x => x * 2];

      expect(
        'dropRepeatsWith test 2',
        [0, 1, 2],
        compose(curry(map)(fn => fn(1)), curry(dropRepeatsWith)((fnX, fnY) => fnX(1) === fnY(1)))(computations)
      );
    },
    () => {
      // ramdajs example
      let numbers = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];

      expect('dropRepeatsWith test 1', [1, 3, 4, -5, 3], dropRepeatsWith((x, y) => Math.abs(x) === Math.abs(y), numbers));
    }
  )();
}

module.exports = dropRepeatsWith_test;
