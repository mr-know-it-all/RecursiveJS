const length = require('../length/length.js');
const take = require('../take/take.js');
const drop = require('../drop/drop.js');

// Ord a, Sorted [a] => a -> [a] -> Boolean
function bisectSearch(el, xs) {
  if(length(xs) === 0) return false;

  let left = take(Math.ceil(length(xs) / 2) - 1, xs);
  let middle = xs[Math.ceil(length(xs) / 2) - 1];
  let right = drop(Math.ceil(length(xs) / 2), xs);

  return middle === el || bisectSearch(el, middle > el ? left : right);
}

// // "pointer" version
// // Ord a, Sorted [a] => a -> [a] -> Boolean
// function bisectSearch(el, xs) {
//   return (function bisectSearch(start, end) {
//     if(end === start) return false;
//
//     let middle = Math.ceil((end + start)/2) - 1;
//     if(xs[middle] === el) return true;
//     if(xs[middle] > el) return bisectSearch(start, middle);
//     if(xs[middle] < el) return bisectSearch(middle + 1, end);
//   })(0, length(xs) - 1);
// }

module.exports = bisectSearch;