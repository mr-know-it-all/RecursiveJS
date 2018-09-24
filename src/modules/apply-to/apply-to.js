// applyTo :: a -> (a -> b) -> b
function applyTo(x) {
  return fn => fn(x);
}

module.exports = applyTo;