const splitEvery = require('./split-every.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function splitEvery_test() {
  compose(
    () => expect('splitEvery test 2', ['for', 'tyt', 'wo'], splitEvery(3, 'fortytwo')),
    () => expect('splitEvery test 1', [[1, 2, 3], [4, 5, 6], [7]], splitEvery(3, [1, 2, 3, 4, 5, 6, 7]))
  )();
}

module.exports = splitEvery_test;
