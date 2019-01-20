const curry = require('./curry.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function curry_test() {
  let curryFunction = function(a, b, c, d) {
    return a + b + c + d;
  };

  expect('curry', curryFunction(1, 2, 3, 4), curry(curryFunction)(1)(2, 3)(4));
}

module.exports = curry_test;
