// filter :: (a -> Boolean, [a]) -> [a]
function filter(fn, xs) {
  return (function filter([x, ...xs], acc = []) {
    return x === undefined ? acc : filter(xs, fn(x) ? [...acc, x] : acc);
  })(xs);
}

module.exports = filter;