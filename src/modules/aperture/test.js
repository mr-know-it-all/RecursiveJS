const aperture = require('./aperture.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function aperture_test() {
  compose(
    () => expect('aperture', [[1, 2], [2, 3], [3, 4], [4, 5]], aperture(2, [1, 2, 3, 4, 5])), // ramdajs test
    () => expect('aperture', [[1, 2, 3], [2, 3, 4], [3, 4, 5]], aperture(3, [1, 2, 3, 4, 5])), // ramdajs test
    () => expect('aperture', [], aperture(7, [1, 2, 3, 4, 5])) // ramdajs test
  )();
}

module.exports = aperture_test;
