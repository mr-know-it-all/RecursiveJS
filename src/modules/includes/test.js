const includes = require('./includes.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function includes_test() {
  compose(
    () => expect(
      'includes test',
      false,
      includes('d value', ['a value', 'b value', 'c value'])
    ),
    () => expect(
      'includes test',
      true,
      includes('a value', ['a value', 'b value', 'c value'])
    )
  )();
}

module.exports = includes_test;
