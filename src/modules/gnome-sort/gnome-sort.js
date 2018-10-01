const length = require('../length/length.js');
const swap = require('../swap/swap.js');

// gnomeSort :: Ord a => [a] -> [a]
function gnomeSort(xs) {
  return (function gnomeSort(xs, index = 0) {
    return (
      index === length(xs) ? xs
        : index === 0 ? gnomeSort(xs, index + 1)
          : xs[index] < xs[index - 1] ? gnomeSort(swap(xs, index, index - 1), index - 1)
            : gnomeSort(xs, index + 1)
    );
  })(xs);
}

module.exports = gnomeSort;