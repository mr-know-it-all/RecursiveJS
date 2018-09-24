// reduceWhile :: (((a, b) -> Boolean), ((a, b) -> a), [b]) -> a
function reduceWhile(pred, fn, [x, ...xs], acc) {
  return x === undefined || !pred(x) ? acc : reduceWhile(pred, fn, xs, fn(acc, x));
}

module.exports = reduceWhile;