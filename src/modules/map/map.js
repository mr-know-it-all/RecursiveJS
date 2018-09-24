// map :: (a -> b, [a]) -> [b]
function map(fn, xs) {
  return (function map([x, ...xs], acc = []) {
    return x === undefined && acc || map(xs, [...acc, fn(x)]);
  })(xs);
}

module.exports = map;