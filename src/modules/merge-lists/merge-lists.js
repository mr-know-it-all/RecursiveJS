const length = require('../length/length.js');

// mergeLists :: Ord a => ([a], [a]) -> [a]
function mergeLists(left, right, acc = []) {
  let [x, ...xs] = left;
  let [y, ...ys] = right;

  if(x === undefined && y === undefined) return acc;

  if(length(left) === 0) return [...acc, ...right];
  if(length(right) === 0) return [...acc, ...left];

  if(x === undefined) return [...acc, y];
  if(y === undefined) return [...acc, x];

  if(left[length(left) - 1] < right[0]) return [...acc, ...left, ...right];
  if(left[length(right) - 1] < left[0]) return [...acc, ...right, ...left];

  if(x < y) return mergeLists(xs, right, [...acc, x]);
  else return mergeLists(left, ys, [...acc, y]);
}

module.exports = mergeLists;