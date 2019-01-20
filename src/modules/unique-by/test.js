const uniqueBy = require('./unique-by.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function uniqueBy_test() {
  expect('uniqueBy', [1, 2, 3], uniqueBy(x => x, [1, 2, 1, 2, 3, 3, 3, 1]));
  expect(
    'unique',
    [{id: 1}, {id: 2}, {id: 3}],
    uniqueBy(
      ({id}) => id,
      [{id: 1}, {id: 1}, {id: 2}, {id: 2}, {id: 3}, {id: 3}]
    )
  );
}

module.exports = uniqueBy_test;
