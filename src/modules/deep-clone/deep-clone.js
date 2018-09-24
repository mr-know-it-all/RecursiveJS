const objectEntries = require('../object-entries/object-entries.js');
const map = require('../map/map.js');

// deepClone :: Object a => a -> a
function deepClone(obj) {
  return (function deepClone([[k, v] = [], ...kvs], acc = {}) {
    if(k === undefined) return acc;

    acc[k] = (
      Array.isArray(v)
        ? (function cloneArray(xs) {
          return map(x => (
            Array.isArray(x)
              ? cloneArray(x)
              : x instanceof Object
                ? deepClone(objectEntries(x))
                : x
          ), xs);
        })(v)
        : v instanceof Object
          ? deepClone(objectEntries(v), acc[k])
          : v
    );

    return deepClone(kvs, acc);
  })(objectEntries(obj));
}

module.exports = deepClone;