const pathSatisfies = require('./path-satisfies.js');
const compose = require('../compose/compose.js');
const every = require('../every/every.js');
const curry = require('../curry/curry.js');
const { expect } = require('../../../tests/tests.js');

const isEven = x => x % 2 === 0;

function pathSatisfies_test() {
  compose(
    () => expect(
      'pathSatisfies test',
      true,
      pathSatisfies(curry(every)(isEven), [0, 1, 2, 3, 4], [[[],[[],[], [[], [], [], [[], [], [], [], [42, 2, 4, 6]]]]]])
    ),
    () => expect(
      'pathSatisfies test',
      false,
      pathSatisfies(curry(every)(isEven), [0, 1, 2, 3, 4], [[[],[[],[], [[], [], [], [[], [], [], [], [42, 2, 4, 6, 1]]]]]])
    )
  )();
}

module.exports = pathSatisfies_test;
