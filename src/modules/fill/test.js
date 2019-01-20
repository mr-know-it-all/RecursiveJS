const fill = require('./fill.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function fill_test() {
  const fillArray = [1, 1, 1, 1, 1, 1];
  const fillArrayObjects = [{a: 1 }, {a: 1}, {a: 1}, {a: 1}, {a: 1}];

  compose (
    () => expect('fill', fillArrayObjects, fill({a: 1}, 5)),
    () => expect('fill', fillArray, fill(1, 6))
  )();
}

module.exports = fill_test;
