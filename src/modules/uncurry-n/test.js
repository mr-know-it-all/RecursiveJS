const uncurryN = require('./uncurry-n.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function uncurryN_test() {
  const curriedAdderFunc = a => b => c => d => a + b + c + d;
  const uncurriedAdderFunc = uncurryN(4, curriedAdderFunc);

  compose(
    () => expect(
      'uncurryN test',
      50,
      uncurriedAdderFunc(11, 12, 13, 14)
    ),
    () => {
      try {
        uncurriedAdderFunc(1)(2)(3)(4);
      } catch (e) {
        expect(
          'uncurryN test',
          'the function curriedAdderFunc expects 4 arguments and it was called with only 1',
          e
        );
      }
    }
  )();
}

module.exports = uncurryN_test;
