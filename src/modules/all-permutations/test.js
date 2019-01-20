const allPermutations = require('./all-permutations.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function allPermutations_test() {
  compose(
    () => {
      let chars = [
        [ 'a', 'b', 'c', 'd' ],
        [ 'a', 'b', 'd', 'c' ],
        [ 'a', 'c', 'b', 'd' ],
        [ 'a', 'c', 'd', 'b' ],
        [ 'a', 'd', 'b', 'c' ],
        [ 'a', 'd', 'c', 'b' ],
        [ 'b', 'a', 'c', 'd' ],
        [ 'b', 'a', 'd', 'c' ],
        [ 'b', 'c', 'a', 'd' ],
        [ 'b', 'c', 'd', 'a' ],
        [ 'b', 'd', 'a', 'c' ],
        [ 'b', 'd', 'c', 'a' ],
        [ 'c', 'a', 'b', 'd' ],
        [ 'c', 'a', 'd', 'b' ],
        [ 'c', 'b', 'a', 'd' ],
        [ 'c', 'b', 'd', 'a' ],
        [ 'c', 'd', 'a', 'b' ],
        [ 'c', 'd', 'b', 'a' ],
        [ 'd', 'a', 'b', 'c' ],
        [ 'd', 'a', 'c', 'b' ],
        [ 'd', 'b', 'a', 'c' ],
        [ 'd', 'b', 'c', 'a' ],
        [ 'd', 'c', 'a', 'b' ],
        [ 'd', 'c', 'b', 'a' ]
      ];

      let nums = [
        [ 1, 2, 3 ],
        [ 1, 3, 2 ],
        [ 2, 1, 3 ],
        [ 2, 3, 1 ],
        [ 3, 1, 2 ],
        [ 3, 2, 1 ]
      ];

      let objs = [
        [ { a: 1 }, { a: 2 }, { a: 3 } ],
        [ { a: 1 }, { a: 3 }, { a: 2 } ],
        [ { a: 2 }, { a: 1 }, { a: 3 } ],
        [ { a: 2 }, { a: 3 }, { a: 1 } ],
        [ { a: 3 }, { a: 1 }, { a: 2 } ],
        [ { a: 3 }, { a: 2 }, { a: 1 } ]
      ]

      expect('allPermutations', objs, allPermutations([{a: 1}, {a: 2}, {a: 3}]));
      expect('allPermutations', nums, allPermutations([1, 2, 3]));
      expect('allPermutations', chars, allPermutations('abcd'));
      expect('allPermutations', chars, allPermutations(['a', 'b', 'c', 'd']));
    }
  )();
}

module.exports = allPermutations_test;
