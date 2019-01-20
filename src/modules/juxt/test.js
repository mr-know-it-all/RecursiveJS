const juxt = require('./juxt.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function juxt_test() {
  expect('juxt', [1, 9], juxt([Math.min, Math.max], [9, 1, 3, 1, 2, 3, 4, 5, 6]));
}

module.exports = juxt_test;
