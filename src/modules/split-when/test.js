const splitWhen = require('./split-when.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function splitWhen_test() {
  compose(
    () => expect('splitWhen test 2', ['abc', 'defg'], splitWhen(x => x === 'd', 'abcdefg')),
    //ramdajs example
    () => expect('splitWhen test 1', [[1], [2, 3, 4, 5, 6]], splitWhen(x => x === 2, [1, 2, 3, 4, 5, 6]))
  )();

}

module.exports = splitWhen_test;
