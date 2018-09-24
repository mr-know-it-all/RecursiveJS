// some :: (a -> Boolean, [a]) -> Boolean
function some(fn, xs) {
  return (function some([x, ...xs]) {
    return x === undefined ? false : fn(x) || some(xs);
  })(xs);
}

module.exports = some;