const compose = require('../compose/compose.js');

// trasnduce :: TODO: add type signature
function transduce(transducers, reducingFn, initialVal, collection) {
  return collection.reduce(transducers(reducingFn), initialVal);
}
module.exports = transduce;
