const mapObjIndexed = require('./map-obj-indexed.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function mapObjIndexed_test() {
  compose(
    () => expect(
      'mapObjIndexed test 2',
      {a: [2, {a: 1, b: 2, c: 3}], b: [3, {a: 1, b: 2, c: 3}], c: [4, {a: 1, b: 2, c: 3}]},
      mapObjIndexed(
        (val, key, obj) => [val + 1, obj],
        {a: 1, b: 2, c: 3}
      )
    ),
    () => expect(
      'mapObjIndexed test 1',
      {a: 'a has value 1', b: 'b has value 2', c: 'c has value 3'},
      mapObjIndexed(
        (val, key, obj) => `${key} has value ${val}`,
        {a: 1, b: 2, c: 3}
      )
    )
  )();
}

module.exports = mapObjIndexed_test;
