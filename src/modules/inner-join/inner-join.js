const filter = require('../filter/filter.js');

// innerJoin :: (((a, b) -> Boolean), [a], [b]) -> [a]
function innerJoin(fn, xs, ys) {
  return (function innerJoin(xs, [y, ...ys], acc = []) {
    return (
      y === undefined && acc || innerJoin(xs, ys, [...acc, ...filter(x => fn(x, y), xs)])
    );
  })(xs, ys);
}

module.exports = innerJoin;