const compose = require('../compose/compose.js');
const length = require('../length/length.js');
const curry = require('../curry/curry.js');

// swap :: Int -> Int -> [a] -> [a]
const swap = (a, b, xs) => ([xs[a], xs[b]] = [xs[b], xs[a]], xs);

// maxHeapify :: Int -> Int -> [a] -> [a]
const maxHeapify = (i, size, xs) => {
  let l = 2 * i + 1, r = 2 * i + 2, lt = i;

  l < size && xs[l] > xs[i] && (lt = l);
  r < size && xs[r] > xs[lt] && (lt = r);

  return lt === i ? xs : compose(
    curry(maxHeapify)(lt, size),
    curry(swap)(i, lt)
  )(xs)
};

// buildHeap :: Int -> [a] -> [a]
const buildHeap = (i, xs) => {
  return i < 0 ? xs : compose(
    curry(buildHeap)(i - 1),
    curry(maxHeapify)(i, length(xs))
  )(xs);
};

// heapSort :: [a] -> [a]
function heapSort(xs) {
  // doSort :: Int -> [a] -> [a]
  return (function doSort(size, xs) {
    return size < 1 ? xs : compose(
      curry(doSort)(size - 1),
      curry(maxHeapify)(0, size),
      curry(swap)(0, size),
      xs => size === length(xs) - 1 ? buildHeap(
        Math.floor(length(xs) / 2) - 1, xs
      ) : xs
    )(xs);
  })(length(xs) - 1, xs);
};

module.exports = heapSort
