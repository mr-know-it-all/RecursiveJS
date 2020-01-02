const millerRabin = require('./miller-rabin.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function millerRabin_test() {
  compose(
    () => { expect('millerRabin', false, millerRabin(120, 20)); },
    () => { expect('millerRabin', false, millerRabin(21123232)); },
    () => { expect('millerRabin', true, millerRabin(2112323)); },
    () => { expect('millerRabin', true, millerRabin(13)); },
    () => { expect('millerRabin', true, millerRabin(22369)); },
    () => { expect('millerRabin', false, millerRabin(1024)); },
  )();
}

module.exports = millerRabin_test;
