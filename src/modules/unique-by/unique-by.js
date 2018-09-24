const find = require('../find/find.js');

// uniqueBy :: (a -> a, [a]) -> [a]
function uniqueBy(fn, xs) {
  return (function uniqueBy([x, ...xs], acc = [x]) {
    return (
      x === undefined && acc || uniqueBy(
        xs, !find(y => fn(y) === fn(x), acc) && [...acc, x] || acc
      )
    );
  })(xs);
}

module.exports = uniqueBy;