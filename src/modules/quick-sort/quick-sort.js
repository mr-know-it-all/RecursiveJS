const filter = require('../filter/filter.js');

// quickSort :: Filterable f => f a -> f a
function quickSort([x, ...xs]) {
  return x === undefined && [] || [
    ...quickSort(filter(y => y <= x, xs)),
    x,
    ...quickSort(filter(y => y > x, xs))
  ];
}

module.exports = quickSort;