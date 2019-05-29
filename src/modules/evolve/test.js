const evolve = require('./evolve.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

const trim = s => s.trim();
const add = x => n => x + n;

// ramda js example
function evolve_test() {
  const tomato = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id: 123};
  const transformations = {
    firstName: trim,
    lastName: trim,
    data: {elapsed: compose(add(1), add(2)), remaining: add(-1)}
  };
  const transformedObject = { firstName: 'Tomato', data: { elapsed: 103, remaining: 1399 }, id: 123 }

  expect('evolve test one', transformedObject, evolve(transformations, tomato));
}

module.exports = evolve_test;
