const compose = require('../compose/compose.js');
const length = require('../length/length.js');
const take = require('../take/take.js');
const curry = require('../curry/curry.js');

// flip :: Integer -> [a] -> [a]
function flip(k) {
  return xs => (function flip([x, ...xs], acc) {              
    return (
      x === undefined
      ? acc
      : length(acc) === k
      ? [...acc, x, ...xs]
      : flip(xs, [x, ...acc])
    );
  })(xs, []);
}

// findMaxIndexBy :: Ord a => ((a, a) -> Boolean) -> [a] -> Integer
function findMaxIndexBy(isLarger = (x, y) => x > y) {
  return xs => (function findMaxIndexBy([x, ...xs], index, [maxValue, maxIndex]) {                     
    return (
      x === undefined
      ? maxIndex
      : maxValue === null || isLarger(x, maxValue)
      ? findMaxIndexBy(xs, index + 1, [x, index])
      : findMaxIndexBy(xs, index + 1, [maxValue, maxIndex])
    );
  })(xs, 0, [null, null]);
}  

// pancakeSort :: Ord a => [a] -> [a]
function pancakeSort(arr) {
  return (function pancakeSort(xs, index) {
    if (index < 0) return xs;

    const newList = compose(
      maxIndex => (
        maxIndex !== index
        ? compose(flip(index + 1), flip(maxIndex + 1))(xs)
        : xs
      ),
      compose(findMaxIndexBy(), curry(take)(index + 1))
    )(xs);

    return pancakeSort(newList, index - 1);
  })(arr, length(arr) - 1);
}

module.exports = pancakeSort;
