// find :: (a -> Boolean, [a]) -> a | false
function find(fn, xs) {
  return (function find(fn, [x, ...xs]) {
    return x === undefined ? false : fn(x) ? x : find(fn, xs);
  })(fn, xs);
}

module.exports = find;