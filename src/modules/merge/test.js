const merge = require('./merge.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function merge_test() {
  expect(
    'merge', {
      age: '27',
      city: 'NY',
      alias: 'aka',
      name: 'John'
    },
    merge({
      age: '21',
      alias: 'aka',
      city: 'WS',
      name: 'John'
    }, {
      age: '27',
      city: 'NY'
    })
  );
}

module.exports = merge_test;
