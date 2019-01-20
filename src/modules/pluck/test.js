const pluck = require('./pluck.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function pluck_test() {
  compose(
    () => expect(
      'pluck', ['21', '22', '23'],
      pluck('age', [{
          age: '21',
          alias: 'aka1',
          city: 'WS1',
          name: 'John1'
        }, {
          age: '22',
          alias: 'aka2',
          city: 'WS2',
          name: 'John2'
        }, {
          age: '23',
          alias: 'aka3',
          city: 'WS3',
          name: 'John3'
        }]
      )
    ),
    () => expect(
      'pluck', [1, 2, 3, 4],
      pluck(0, [
        [1, 42],
        [2, 42],
        [3, 42],
        [4, 42]
      ])
    )
  )();
}

module.exports = pluck_test;
