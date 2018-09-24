const filter = require('../filter/filter.js');
const quickSort = require('../quick-sort/quick-sort.js');

// sortWith :: ((a, a) -> 1 | -1 | 0, [a]) -> [a]
function quickSortWith(fn, [x, ...xs]) {
  return x === undefined ? [] : [
  	...quickSort(filter(y => fn(x, y) === 1, xs)),
  	x,
  	...quickSort(filter(y => fn(x, y) === -1, xs))
  ];
}

module.exports = quickSortWith;