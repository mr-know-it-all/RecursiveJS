const map = require('./map.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function map_test() {
  let mapArray = [1, 2, 3, 4];

  compose(
    () => expect('map', [1, 2, 3, 4], mapArray),
    () => expect('map', [2, 3, 4, 5], map(x => x + 1, mapArray))
  )();
}

module.exports = map_test;
