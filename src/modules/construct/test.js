const construct = require('./construct.js');
const compose = require('../compose/compose.js');
const reduce = require('../reduce/reduce.js');
const length = require('../length/length.js');
const { expect } = require('../../../tests/tests.js');

function construct_test() {
  function Garden(...args) {
    this.plants = args;
  }
  Garden.prototype.harvest = function() {
    return reduce(
      (acc, v) => length(acc) === 0 ? `My harvest: ${v}` : `${acc}, ${v}`,
      this.plants,
      ''
    );
  };
  const gardenConstructor = construct(Garden);
  const myGarden = gardenConstructor('onions', 'beans', 'tommatoes');

  expect(
    'construct test',
    'My harvest: onions, beans, tommatoes',
    myGarden.harvest()
  )
}

module.exports = construct_test;
