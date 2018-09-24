const length = require('../length/length.js');
const mergeLists = require('../merge-lists/merge-lists.js');
const take = require('../take/take.js');
const drop = require('../drop/drop.js');

// mergeSort :: Ord a => [a] -> [a]
function mergeSort(xs) {
  if(length(xs) === 1) return xs;

  let left = mergeSort(take(Math.ceil(length(xs) / 2), xs));
  let right = mergeSort(drop(Math.ceil(length(xs) / 2), xs));

  return mergeLists(left, right);
}

module.exports = mergeSort;