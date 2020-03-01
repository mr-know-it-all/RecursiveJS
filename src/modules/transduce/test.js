const transduce = require('./transduce.js');
const compose = require('../compose/compose.js');
const concat = require('../concat/concat.js');
const { expect } = require('../../../tests/tests.js');

const mapping   = mappingFn => reducingFn => (acc, val) => reducingFn(acc, mappingFn(val));
const filtering = predFn    => reducingFn => (acc, val) => predFn(val) ? reducingFn(acc, val) : acc;
const sum = (a, b) => a + b;

function transduce_test() {
  compose(
    () => {
      const filterFn = x => x % 2 === 0;
      const mappingFn = x => x * x;
      const transducers = compose(filtering(filterFn), mapping(mappingFn));

      const result = transduce(transducers, sum, 12, [1, 22, 3])
      expect('transduce test 1', 496, result)
    },
    () => {
      const filterFn = x => x < 10;
      const mappingFn = x => x + 3;
      const transducers = compose(filtering(filterFn), mapping(mappingFn));

      const result = transduce(transducers, concat, [], [1, 20])
      expect('transduce test 1', [4], result)
    },
    () => {
      const filterFn = x => x !== 1;
      const mappingFn = x => `hello: ${x}!`;
      const transducers = compose(filtering(filterFn), mapping(mappingFn));

      const result = transduce(transducers, concat, [], [1, 2, 3])
      expect('transduce test 1', ['hello: 2!', 'hello: 3!'], result)
    }
  )();
}

module.exports = transduce_test;
