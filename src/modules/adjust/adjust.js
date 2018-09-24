// adjust :: (a -> a) -> Number -> [a] -> [a]
function adjust(fn, index, xs) {
  return (function adjust([x, ...xs], currentIndex = 0, acc = []) {
    return currentIndex === index ? [...acc, fn(x), ...(xs ? xs : [])] : adjust(xs, currentIndex + 1, [...acc, x])
  })(xs);
}

module.exports = adjust;