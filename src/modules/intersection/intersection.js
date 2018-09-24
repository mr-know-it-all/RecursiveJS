const compose = require('../compose/compose.js');
const curry = require('../curry/curry.js');
const find = require('../find/find.js');
const quickSort = require('../quick-sort/quick-sort.js');
const uniqueBy = require('../unique-by/unique-by.js');

// intersection :: ([*], [*]) -> [*]
function intersection(xs, ys) {
  return (function intersection([x, ...xs], ys, acc = []) {
    return (
      x === undefined && compose(quickSort, curry(uniqueBy)(x => x))(acc) || intersection(
        xs, ys,
        find(y => y === x, ys) && [...acc, x] || acc
      )
    );
  })(xs, ys);
}

module.exports = intersection;