const innerJoin = require('./inner-join.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function innerJoin_test() {
  let innerJoinResult = innerJoin(
    (user, id) => user.id === id, [{
      id: 1,
      name: 'User One'
    }, {
      id: 2,
      name: 'User Two'
    }, {
      id: 3,
      name: 'User Three'
    }, {
      id: 4,
      name: 'User Four'
    }, {
      id: 5,
      name: 'User Five'
    }], [1, 3, 5]
  );

  expect('innerJoin', [{
    id: 1,
    name: 'User One'
  }, {
    id: 3,
    name: 'User Three'
  }, {
    id: 5,
    name: 'User Five'
  }], innerJoinResult);
}

module.exports = innerJoin_test;
