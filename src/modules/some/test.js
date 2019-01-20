const some = require('./some.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function some_test() {
  const someArrayTrue = [false, false, false, true];
  const someArrayFalse = [false, false, false, false];

  compose(
    () => expect('some', false, some(x => x === true, someArrayFalse)),
    () => expect('some', true, some(x => x === true, someArrayTrue))
  )();

}

module.exports = some_test;
