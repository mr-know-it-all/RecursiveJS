const nAry = require('./n-ary.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function nAry_test() {
  const nAryAdd = (x = 'not supplied', y = 'not supplied') => [x, y];
  const twoArgsAdd = nAry(2, nAryAdd);
  const oneArgAdd = nAry(1, nAryAdd);
  const zeroArgsAdd = nAry(0, nAryAdd);

  compose(
    () => expect('nAry test 6', [1, 2], twoArgsAdd(1, 2)),
    () => expect('nAry test 5', ['not supplied', 'not supplied'], zeroArgsAdd(1, 2)),
    () => expect('nAry test 4', [1, 'not supplied'], oneArgAdd(1, 2)),
    () => expect('nAry test 3', 2, twoArgsAdd.length),
    () => expect('nAry test 2', 1, oneArgAdd.length),
    () => expect('nAry test 1', 0, zeroArgsAdd.length)
  )();
}

module.exports = nAry_test;
