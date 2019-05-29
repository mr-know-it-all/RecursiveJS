const objectEntries = require('../object-entries/object-entries.js');
const forEach = require('../for-each/for-each.js');
const compose = require('../compose/compose.js');
const curry = require('../curry/curry.js');

// evolve :: Object -> Object
function evolve(transformations = [], object = {}) {
  // applyTransformations :: Object -> ([K, v]) -> ()
  const applyTransformations = object => ([k, fnOrTr]) => {
    if(object[k] === undefined) return;
    
    typeof fnOrTr === 'function'
      ? object[k] = fnOrTr(object[k])
      : evolve(fnOrTr, object[k]);
  };

  compose(curry(forEach)(applyTransformations(object)), objectEntries)(transformations);
  return object;
}

module.exports = evolve;
