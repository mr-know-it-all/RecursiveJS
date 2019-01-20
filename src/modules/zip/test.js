const zip = require('./zip.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function zip_test() {
  expect(
    'zip', [
      [1, 'a'],
      [2, 'b'],
      [3, 'c']
    ],
    zip([1, 2, 3], ['a', 'b', 'c', 'd', 'e'])
  );
}

module.exports = zip_test;
