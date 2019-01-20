const omit = require('./omit.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function omit_test() {
  expect(
    'omit', {
      alias: 'aka',
      name: 'John'
    },
    omit(
      ['age', 'city'], {
        age: '21',
        alias: 'aka',
        city: 'WS',
        name: 'John'
      }
    )
  );
}

module.exports = omit_test;
