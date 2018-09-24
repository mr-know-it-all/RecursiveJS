// unfold :: (a -> [b]) -> a -> [b]
function unfold(fn, seed, acc = []) {
  const nextValue = fn(seed);
  return nextValue ? unfold(fn, nextValue[1], [...acc, nextValue[0]]) : acc;
}

module.exports = unfold;