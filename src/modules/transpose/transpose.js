const length = require('../length/length.js');
const filter = require('../filter/filter.js');
const map = require('../map/map.js');
const reduce = require('../reduce/reduce.js');

// transpose :: [[a]] -> [[a]]
function transpose(xs) {
  let maxIndex = reduce((acc, v) => length(v) > acc ? length(v) : acc, xs, 0) - 1;

  return (function transpose(index = 0, acc = []) {
    // TODO: after forEach fix, use it instead of map
    map(x => acc[index] = acc[index] ? [...acc[index], x[index] || null] : [x[index] || null], xs);

    return index === maxIndex ? map(xs => filter(x => x !== null, xs), acc) : transpose(index + 1, acc);
  })();
}

module.exports = transpose;