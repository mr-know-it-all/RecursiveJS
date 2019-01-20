const partition = require('./partition.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

const isEven = x => x % 2 === 0;
const isInteger = x => Number.isInteger(x);

function partition_test() {
  compose(
    () => expect(
      'partition test', [
        [1, 2, 3],
        ['one', 'two', 'three']
      ],
      partition(isInteger, [1, 'one', 2, 'two', 3, 'three'])
    ),
    () => expect(
      'partition test', [
        [2, 4, 6, 8],
        [1, 3, 5, 7]
      ],
      partition(isEven, [1, 2, 3, 4, 5, 6, 7, 8])
    )
  )();

}

module.exports = partition_test;
