const zipObj = require('./zip-obj.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function zipObj_test() {
  expect(
    'zipObj test', {
      a: 1,
      b: 2,
      c: 3
    },
    zipObj(['a', 'b', 'c', 'd', 'e'], [1, 2, 3])
  )
}

module.exports = zipObj_test;
