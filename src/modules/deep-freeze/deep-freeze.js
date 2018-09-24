const range = require('../range/range.js');

// deepFreeze :: a -> a
function deepFreeze(obj) {
  const getReducer = obj => Array.isArray(obj) ? range(0, obj.length) : Object.keys(obj);

  (function deepFreeze([x, ...xs], obj) {
    Object.freeze(obj);
    typeof obj[x] === 'object' && deepFreeze(getReducer(obj[x]), obj[x]);
    return x === undefined ? x : deepFreeze(xs, obj);
  })(getReducer(obj), obj);

  return obj;
}

module.exports = deepFreeze;