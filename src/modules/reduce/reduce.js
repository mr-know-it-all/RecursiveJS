// reduce :: ((a, b) -> a, [b], a) -> a
function reduce(fn, _xs_, acc) {
  return (function reduce(fn, [x, ...xs], acc, index = 0) {
    return x === undefined ? acc : reduce(fn, xs, fn(acc, x, index + 1, _xs_));
  })(fn, _xs_, acc);
}

module.exports = reduce;
