const objectEntries = require('../object-entries/object-entries.js');
const reduce = require('../reduce/reduce.js');

// mergeWith :: (((a, a) -> a), {a}, {a}) -> {a}
function mergeWith(fn, xo, yo) {
  return (
    reduce(
      (acc, v) => (acc[v[0]] = acc[v[0]] ? fn(v[1], acc[v[0]]) : v[1], acc), [...objectEntries(yo), ...objectEntries(xo)], {})
  );
}

module.exports = mergeWith;