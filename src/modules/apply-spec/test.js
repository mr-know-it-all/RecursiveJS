const applySpec = require('./apply-spec.js');
const compose = require('../compose/compose.js');
const reduce = require('../reduce/reduce.js');
const converge = require('../converge/converge.js');
const length = require('../length/length.js');
const { expect } = require('../../../tests/tests.js');

function applySpec_test() {
  const sum = xs => reduce((acc, v) => acc + v, xs, 0);
  const average = xs => converge((x, y) => x / y, [sum, length])(xs);

  const specObject = {
    sum, average
  };
  const specObjectNested = {
    sum, average, nested: {sum}
  };

  const specObjectNestedTwice = {
    sum, average, nested: {nested: {sum}, nest: {nest: {average}}}
  };

  compose(
    () => {
      expect(
        'applySpec test 3', {
          sum: 10,
          average: 2.5,
          nested: {
            nested: {
              sum: 10
            },
            nest: {
              nest: {
                average: 2.5
              }
            }
          }
        },
        applySpec(specObjectNestedTwice)(1, 2, 3, 4)
      )
    },
    () => {
      expect(
        'applySpec test 2', {
          sum: 10,
          average: 2.5,
          nested: {
            sum: 10
          }
        },
        applySpec(specObjectNested)(1, 2, 3, 4)
      )
    },
    () => {
      expect(
        'applySpec test 1', {
          sum: 10,
          average: 2.5
        },
        applySpec(specObject)(1, 2, 3, 4)
      )
    }
  )();
}

module.exports = applySpec_test;
