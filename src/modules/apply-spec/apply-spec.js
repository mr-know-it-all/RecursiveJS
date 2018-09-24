const objectEntries = require('../object-entries/object-entries.js');

// applySpec :: {Key: ((a, b ...) -> v)} -> ((a, b ...) -> {Key: v})
function applySpec(xo) {
  return (...args) => {
    return (function applySpec([x, ...xs], acc = {}) {
      return (
        x === undefined ? acc :
          typeof x[1] !== 'function' ?
            applySpec(xs, (acc[x[0]] = applySpec(objectEntries(x[1])), acc)) :
            applySpec(xs, (acc[x[0]] = x[1](args), acc))
      );
    })(objectEntries(xo));
  }
}

module.exports = applySpec;