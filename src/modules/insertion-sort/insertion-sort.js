// insertionSort :: Ord a => [a] -> [a]
function insertionSort(xs) {
  return (function insertionSort([x, ...xs], sorted = []) {
    return x === undefined ? sorted : insertionSort(xs, (function addToSorted([y, ...ys], acc = []) {
      if(y === undefined) return [...acc, x];
      if(x < y) return [...acc, x, y, ...ys];
      return addToSorted(ys, [...acc, y]);
    })(sorted));
  })(xs);
}

module.exports = insertionSort;