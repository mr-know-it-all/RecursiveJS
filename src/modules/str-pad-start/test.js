const strPaddStart = require('./str-pad-start.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function strPaddStart_test() {
  compose(
    () => expect('strPaddStart', '001', strPaddStart(0, 3, '1')),
    () => expect('strPaddStart', '111', strPaddStart(0, 3, '111')),
    () => expect('strPaddStart', '###1', strPaddStart('#', 4, '1')),
    () => expect('strPaddStart', '01', strPaddStart(0, 2, '1'))
  )();
}

module.exports = strPaddStart_test;
