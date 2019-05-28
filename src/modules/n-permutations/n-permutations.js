const forEach = require('../for-each/for-each.js');

// nPermutations :: Int -> [a] -> [[a]]
function nPermutations(n) {
  return xs => {
    // implement and use state monad to store common state
    let permutations = [];

    (function permute(n, xs, permutation = []) {
      forEach((x, i) => {
        // removing the current element would remove same element duplication in permutation
        if(n > 1) permute(n - 1, xs, [...permutation, x]);
        else permutations = [...permutations, [...permutation, x]];
      }, xs);
    })(n, xs);

    return permutations;
  }
}

module.exports = nPermutations;
