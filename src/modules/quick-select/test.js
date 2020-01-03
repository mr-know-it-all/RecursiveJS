const quickSelect = require('./quick-select.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function quickSelect_test() {
  compose(
    () => { expect('quickSelect test', 2, quickSelect(2, [1, 2, 3, 4, 5, 6])); },
    () => { expect('quickSelect test', 3, quickSelect(3, [5, 3, 4, 2, 1, 6])); },
    () => { expect('quickSelect test', 6, quickSelect(3, [9, 1, 2, 6])); },
    () => { expect('quickSelect test', 42, quickSelect(6, [1, 2, 3, 5, 42, 4, 77])); },
    () => { expect('quickSelect test', 24, quickSelect(3, [99, 88, 77, 66, 44, 55, 11, 24, 22])); },
  )();
}

module.exports = quickSelect_test;
