const compose = require('../compose/compose.js');
const reduce = require('../reduce/reduce.js');

// trasnduce :: TODO: add type signature
function transduce(transducers, reducingFn, initialVal, collection) {
  return reduce(transducers(reducingFn), collection, initialVal);
}
module.exports = transduce;
