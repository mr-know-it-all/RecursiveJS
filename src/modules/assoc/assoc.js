const objectEntries = require('../object-entries/object-entries.js');

// assoc :: String -> a -> {Key: v} -> {Key: v}
function assoc(k, v, xo) {
  return (function assoc(k, v, [x, ...xo], acc = {}) {
    return x === undefined ? acc : assoc(k, v, xo, (acc[x[0]] = x[1], acc[k] = v, acc));
  })(k, v, objectEntries(xo));
}

module.exports = assoc;