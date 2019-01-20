const memoize = require('./memoize.js');
const compose = require('../compose/compose.js');
const uniqueBy = require('../unique-by/unique-by.js');
const map = require('../map/map.js');
const length = require('../length/length.js');
const { expect } = require('../../../tests/tests.js');

function memoize_test() {
  let callCount = 0;
  const memoizeList = [
    [4, 2, 3],
    [5, 1, 4],
    [4, 2, 6],
    [5, 1, 7],
    [4, 2, 8],
    [5, 1, 7]
  ];
  const adder = (x, y, z) => (callCount++, x + y);
  const memoizedAdder = memoize(adder);

  map(([x, y]) => {memoizedAdder(x, y);}, memoizeList);

  expect(
    'memoize',
    callCount,
    compose(length, () => uniqueBy(([x, y]) => `${x}${y}`, memoizeList))()
  );
}

module.exports = memoize_test;
