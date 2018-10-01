const length = require('../length/length.js');

// swap :: [a] -> Int -> Int -> [a]
function swap(xs, A, B) {
  return (function swap(A, B, current = 0, acc = []) {
    return (
      xs[current] === undefined
        ? acc
        : swap(A, B, current + 1, [
          ...acc,
          ...(current === A ? [xs[B]] : current === B ? [xs[A]] : [xs[current]])
        ])
    );
  })(Math.min(length(xs) - 1, A), Math.min(length(xs) - 1, B));
}

module.exports = swap;