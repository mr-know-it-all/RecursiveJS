// unless :: (a -> Boolean, a -> a) -> a -> a | null
function unless(pred, fn) {
  return x => pred(x) ? fn(x) : null;
}

module.exports = unless;