const length = require('../length/length.js');
const reverse = require('../reverse/reverse.js');

// this is a small variation of bubbleSort
// cocktailSort :: Ord a -> [a] -> [a]
function cocktailSort(xs) {
  return (function cocktailSort(
    [x, ...xs],
    reversed = false,
    acc = [],
    modified = false
  ) {
    if(x === undefined) return !modified ? reversed ? reverse(acc) : acc : cocktailSort(reverse(acc), !reversed);

    if(length(acc) !== 0 && (
      !reversed && acc[length(acc) - 1] > x ||
      reversed && acc[length(acc) - 1] < x
    )) {
      let tail = acc[length(acc) - 1];
      acc[length(acc) - 1] = x;
      acc = [...acc, tail];
      modified = true;
    } else acc = [...acc, x];

    return cocktailSort(xs, reversed, acc, modified);
  })(xs);
}

module.exports = cocktailSort;