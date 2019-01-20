const project = require('./project.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function project_test() {
  const people = [{
    name: 'John',
    age: 30,
    city: 'NY',
    country: 'US'
  }, {
    name: 'Joe',
    age: 31,
    city: 'WS',
    country: 'US'
  }, {
    name: 'Jack',
    age: 32,
    city: 'WS',
    country: 'RO'
  }];

  expect(
    'project', [{
      name: 'John',
      age: 30
    }, {
      name: 'Joe',
      age: 31
    }, {
      name: 'Jack',
      age: 32
    }],
    project(['name', 'age'], people)
  );
}

module.exports = project_test;
