const strPaddEnd = require('./str-pad-end.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function strPaddEnd_test() {
  compose(
    () => expect('strPaddEnd', '100', strPaddEnd(0, 3, '1')),
    () => expect('strPaddEnd', '111', strPaddEnd(0, 3, '111')),
    () => expect('strPaddEnd', '1###', strPaddEnd('#', 4, '1')),
    () => expect('strPaddEnd', '1#######', strPaddEnd('#', 8, '1'))
  )();
}

module.exports = strPaddEnd_test;
