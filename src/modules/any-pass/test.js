const anyPass = require('./any-pass.js');
const compose = require('../compose/compose.js');
const some = require('../some/some.js');
const { expect } = require('../../../tests/tests.js');

const isEven = x => x % 2 === 0;
const isOdd = x => !isEven(x);
const largerThanTwo = x => x > 2;
const isInteger = x => Number.isInteger(x);

const hasEvenNumber = xs => some(isEven, xs);
const hasOddNumber = xs => some(isOdd, xs);
const hasLargerThanTwo = xs => some(largerThanTwo, xs);
const hasInteger = xs => some(isInteger, xs);

function anyPass_test() {
  compose(
    () => expect('anyPass 3', true, anyPass([hasEvenNumber, hasOddNumber, hasLargerThanTwo, hasInteger], [4, 6, 8, 10])),
    () => expect('anyPass 2', false, anyPass([hasOddNumber, hasLargerThanTwo], [2, 2, 2])),
    () => expect('anyPass 1', true, anyPass([hasEvenNumber, hasLargerThanTwo, hasInteger], [4, 4, 1]))
  )();
}

module.exports = anyPass_test;
