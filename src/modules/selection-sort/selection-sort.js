const length = require('../length/length.js');
const compose = require('../compose/compose.js');
const curry = require('../curry/curry.js');

// selectionSort :: Ord a => [a] -> [a]
function selectionSort(xs) {
  // getMin :: Ord a => [a] -> a
  const getMin = xs => (function getMin([x, ...xs], min) {
    return x === undefined ? min : getMin(xs, x < min ? x : min);
  })(xs, xs[0]);

  // removeElem :: (a, [a]) -> [a]
  const removeElem = (xs, el) => (function removeElem([x, ...xs], acc = [], found = false) {
    return x === undefined ? acc : removeElem(xs, found || x !== el ? [...acc, x] : acc, found || x === el);
  })(xs);

  return (function selectionSort(xs, sorted = []) {
    if(length(xs) === 0) return sorted;
    return  selectionSort(compose(curry(removeElem)(xs), getMin)(xs), [...sorted, getMin(xs)]);
  })(xs);
}

module.exports = selectionSort;