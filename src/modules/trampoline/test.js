const trampoline = require('./trampoline.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function trampoline_test() {
  function factorialT(n, acc = 1) {
    return n === 1 ? acc : () => factorialT(n - 1, acc * n);
  }

  function factorial(n, acc = 1) {
    return n === 1 ? acc : factorial(n - 1, acc * n);
  }
  const LARGE_NUM = 12000000;

  compose(
    () => expect('trampoline test', Infinity, trampoline(factorialT)(LARGE_NUM)),
    () => {
      try {
        factorial(LARGE_NUM);
      } catch(err) {
        expect('trampoline test', 'RangeError', err.name);
      }
    }
  )();
}

module.exports = trampoline_test;
