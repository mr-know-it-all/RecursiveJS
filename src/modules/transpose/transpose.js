const length = require('../length/length.js');
const filter = require('../filter/filter.js');
const forEach = require('../for-each/for-each.js');
const map = require('../map/map.js');
const reduce = require('../reduce/reduce.js');

// transpose :: [[a]] -> [[a]]
function transpose(xs) {
  let maxIndex = reduce((acc, v) => length(v) > acc ? length(v) : acc, xs, 0) - 1;

  return (function transpose(index = 0, acc = []) {
    forEach(row => (
      acc[index] = acc[index]
        ? [...acc[index], row[index] || null]
        : [row[index] || null]
    ), xs);

    return (
      index === maxIndex
        ? map(xs => filter(Boolean, xs), acc)
        : transpose(index + 1, acc)
    );
  })();
}

module.exports = transpose;
