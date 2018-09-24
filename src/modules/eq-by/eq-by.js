// eqBy :: (a -> b) -> a -> a -> Boolean
function eqBy(fn, a, b) {
  return fn(a) === fn(b);
}

module.exports = eqBy;