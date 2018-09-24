const filter = require('../filter/filter.js');

// quickSortBy :: Filterable f => (a -> a, f a) -> f a
function quickSortBy(fn, [x, ...xs]) {
  return x === undefined && [] || [
    ...quickSortBy(fn, filter(y => fn(y) <= fn(x), xs)),
    x,
    ...quickSortBy(fn, filter(y => fn(y) > fn(x), xs))
  ];
}

module.exports = quickSortBy;