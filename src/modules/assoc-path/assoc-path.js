const objectEntries = require('../object-entries/object-entries.js');
const length = require('../length/length.js');

// assocPath :: [String] -> a -> {Key: v} -> {Key: v}
function assocPath(xs, v, xo) {
  return (function assocShallowCopy([x, ...xo], acc = {}) {
    return x === undefined ? (function applyPath([x, ...xs], path) {
      return length(xs) === 0 ? (path[x] = v, acc) : (!path[x] && (path[x] = {}), applyPath(xs, path[x]));
    })(xs, acc) : assocShallowCopy(xo, (acc[x[0]] = x[1], acc));
  })(objectEntries(xo));
}

module.exports = assocPath;