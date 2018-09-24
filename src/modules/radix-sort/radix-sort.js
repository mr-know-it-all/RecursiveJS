const bubbleSortBy = require('../bubble-sort-by/bubble-sort-by.js');
const length = require('../length/length.js');
const map = require('../map/map.js');
const reduce = require('../reduce/reduce.js');
const reverse = require('../reverse/reverse.js');

// radixSort :: Ord a => [a] -> [a]
function radixSort(xs) {
  let xss = map(String, xs);
  let largestIndex = reduce((acc, v) => length(v) > acc ? length(v) : acc, xss, 0);

  const bubbleSortByIndex = (xs, index) =>
    bubbleSortBy(x => reverse(x)[index - 1] ? Number(reverse(x)[index - 1]) : -Infinity, xs);

  return (function updateList(xs, index = 0) {
    return index > largestIndex ? map(Number, xs) : updateList(bubbleSortByIndex(xs, index), index + 1);
  })(xss);
}

module.exports = radixSort;