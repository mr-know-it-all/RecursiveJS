// takeWhile :: (a -> Boolean, [a]) -> [a]
function takeWhile(fn, xs) {
  return (function takeWhile([x, ...xs], acc = [], index = 0) {
    return (x === undefined || !fn(x, index)) && acc || takeWhile(xs, [...acc, x], index + 1);
  })(xs);
}

module.exports = takeWhile;