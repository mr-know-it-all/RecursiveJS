const objectEntries = require('../object-entries/object-entries.js');
const reduce = require('../reduce/reduce.js');
const uniqueBy = require('../unique-by/unique-by.js');

// merge :: ({Key: v}, {Key: v}) -> {Key: v}
function merge(xo, yo) {
  return (
    reduce(
      (acc, v) => (acc[v[0]] = v[1], acc),
      uniqueBy(
        (x) => x[0], [...objectEntries(yo), ...objectEntries(xo)]
      ), {})
  );
}

module.exports = merge;