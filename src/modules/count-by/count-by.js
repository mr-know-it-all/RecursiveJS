const objectEntries = require('../object-entries/object-entries.js');

// countBy :: (a -> String) -> [a] -> {*}
function countBy(fn) {
  return xs => (function countBy([x, ...xs], acc = {}) {
    return x === undefined ? acc : countBy(xs, (acc[fn(x[1])] ? acc[fn(x[1])]++ : acc[fn(x[1])] = 1, acc));
  })(objectEntries(xs));
}

module.exports = countBy;