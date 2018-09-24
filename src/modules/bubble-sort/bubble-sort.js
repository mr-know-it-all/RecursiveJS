const length = require('../length/length.js');

// Ord a => [a] -> [a]
function bubbleSort(xs) {
  return (function bubbleSort(
    [x, ...xs],
    acc = [],
    modified = false
  ) {
    if(x === undefined) return !modified ? acc : bubbleSort(acc);

    if(length(acc) !== 0 && acc[length(acc) - 1] > x) {
      let tail = acc[length(acc) - 1];
      acc[length(acc) - 1] = x;
      acc = [...acc, tail];
      modified = true;
    } else acc = [...acc, x];

    return bubbleSort(xs, acc, modified);
  })(xs);
}

module.exports = bubbleSort;