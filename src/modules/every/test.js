const every = require('./every.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function every_test() {
  const everyArrayTrue = [false, false, false, true];
  const everyArrayFalse = [false, false, false, false, false];

  compose (
    () => expect('every', true, every(x => x !== true, everyArrayFalse)),
    () => expect('every', false, every(x => x !== true, everyArrayTrue))
  )();
}

module.exports = every_test;
