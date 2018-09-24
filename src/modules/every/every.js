// every :: (a -> Boolean, [a]) -> Boolean
function every(fn, xs) {
  return (function every([x, ...xs]) {
    return x === undefined || (!fn(x) ? false : every(xs));
  })(xs);
}

module.exports = every;