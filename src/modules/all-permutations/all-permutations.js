const length = require('../length/length.js');
const take = require('../take/take.js');
const drop = require('../drop/drop.js');
const map = require('../map/map.js');

// allPermutations :: [a] -> [[a]]
function allPermutations(xs) {
  return (function allPermutations(xs, permutations = []) {
    if(length(xs) < 2) return xs;

    return (function loopList(xs, i = 0) {
      if(i < length(xs)) {
        let x = xs[i];
        let rest = [...take(i, xs), ...drop(i + 1, xs)];
        let nextPermutations = map(subPermutation => [
          x, ...(Array.isArray(subPermutation) ? subPermutation : [subPermutation])
        ], allPermutations(rest));

        permutations = [...permutations, ...nextPermutations];

        return loopList(xs, i + 1)
      } else {
        return permutations;
      }
    })(xs);
  })(xs);
}

module.exports = allPermutations;