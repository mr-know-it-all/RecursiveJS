const bisectSearch = require('./bisect-search.js');
const compose = require('../compose/compose.js');
const range = require('../range/range.js');
const { expect } = require('../../../tests/tests.js');

function bisectSearch_test() {
  compose(
    () => expect('bisectSearch', true, bisectSearch(123, range(12, 126))),
    () => expect('bisectSearch', true, bisectSearch(1, range(1, 11))),
    () => expect('bisectSearch', false, bisectSearch(101, range(1, 12)))
  )();
}

module.exports = bisectSearch_test;
