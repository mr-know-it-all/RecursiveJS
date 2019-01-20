const forEach = require('./for-each.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function forEach_test() {
  const arrayForEach = [{a: 1}, {a: 2}, {a: 3}];
  forEach((x, index) => {
    x.a = x.a * 2;
  }, arrayForEach);
  expect('forEach', [{a: 2}, {a: 4}, {a: 6}], arrayForEach);
}

module.exports = forEach_test;
