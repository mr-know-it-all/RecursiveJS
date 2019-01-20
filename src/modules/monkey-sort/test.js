const monkeySort = require('./monkey-sort.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function monkeySort_test() {
expect('monkeySort', [1, 2, 3, 4], monkeySort([4, 2, 1, 3]));
}

module.exports = monkeySort_test;
