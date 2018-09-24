const objectEntries = require('../object-entries/object-entries.js');

// mapObjIndexed :: ((*, String, Object) -> *) -> Object -> Object
function mapObjIndexed(fn, xo) {
  return (function mapObjIndexed([kv, ...kvs], acc = {}) {
    return kv === undefined ? acc : mapObjIndexed(kvs, (acc[kv[0]] = fn(kv[1], kv[0], xo), acc));
  })(objectEntries(xo));
}

module.exports = mapObjIndexed;