// tap :: ((a → *), a) -> a
function tap(fn, x) {
  return (fn(x), x);
}

module.exports = tap;