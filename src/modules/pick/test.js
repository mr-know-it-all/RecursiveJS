const pick = require('./pick.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function pick_test() {
  expect(
    'pick', {
      age: '21',
      city: 'WS'
    },
    pick(
      ['age', 'city'], {
        age: '21',
        alias: 'aka',
        city: 'WS',
        name: 'John'
      }
    )
  );
}

module.exports = pick_test;
