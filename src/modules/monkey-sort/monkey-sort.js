const allPermutations = require('../all-permutations/all-permutations.js');
const find = require('../find/find.js');

// monkeySort :: Ord a => [a] -> [a]
function monkeySort(xs) {
  // this is an unoptimized version of monkeySort
  // it's better than random order generation but still bad
  // then again, monkeySort isn't the smartest sorting algorithm
  const isSorted = ([x, ...xs], prev) => x === undefined ? true : prev && x < prev ? false : isSorted(xs, x);

  return find(isSorted, allPermutations(xs));
}

module.exports = monkeySort;