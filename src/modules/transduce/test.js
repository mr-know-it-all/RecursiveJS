const transduce = require('./transduce.js');
const compose = require('../compose/compose.js');
const map = require('../map/map.js');
const curry = require('../curry/curry.js');
const filter = require('../filter/filter.js');
const range = require('../range/range.js');
const { expect } = require('../../../tests/tests.js');

const isEven = x => x % 2 === 0;
const isOdd = x => !isEven(x);

function transduce_test() {
  compose(
    () => expect(
      'transduce test 3',
      ['-0-', '-4-', '-8-'],
      transduce(
        [curry(map)(x => `-${x}-`), curry(filter)(x => x < 12), curry(filter)(x => x / 2 % 2 === 0)],
        range(0, 200)
      )
    ),
    () => expect(
      'transduce test 2',
      [0, 2, 4],
      transduce(
        [curry(map)(x => x - 1), curry(filter)(x => x < 7), curry(filter)(isOdd)],
        [1, 2, 3, 4, 5, 6, 7, 8, 9]
      )
    ),
    () => expect(
      'transduce test 1',
      [4, 6],
      transduce(
        [curry(map)(x => x + 2), curry(filter)(x => x + 1 < 7), curry(filter)(isEven)],
        [1, 2, 3, 4, 5, 6, 7, 8, 9]
      )
    )
  )();
}

module.exports = transduce_test;
