const allPass = require('./all-pass.js');
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

function allPass_test() {
  compose(
    () => expect('allPass 2', true, allPass([hasEvenNumber, hasLargerThanTwo, hasInteger], [4, 6, 8, 10, 3])),
    () => expect('allPass 1', false, allPass([hasEvenNumber, hasLargerThanTwo, hasInteger, hasOddNumber], [4, 6, 8, 10]))
  )();
}

module.exports = allPass_test;
