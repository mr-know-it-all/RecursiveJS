const compose = require('./compose.js');
const { expect } = require('../../../tests/tests.js');

function compose_test() {
  const addOne = x => x + 1;
  const multiplyByTwo = x => x * 2;
  const addTwo = x => x + 2;

  expect(
    'compose',
    compose(addOne, compose(multiplyByTwo, addTwo))(42),
    compose(compose(addOne, multiplyByTwo), addTwo)(42)
  );
  expect('compose', multiplyByTwo(addOne(5)), compose(multiplyByTwo, addOne)(5));
}

module.exports = compose_test;
