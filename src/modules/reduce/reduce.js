// reduce :: ((a, b) -> a, [b], a) -> a
function reduce(fn, xs, acc) {
  return (function reduce(fn, [x, ...xs], acc, index = 0) {
    return x === undefined ? acc : reduce(fn, xs, fn(acc, x, index + 1));
  })(fn, xs, acc);
}

module.exports = reduce;