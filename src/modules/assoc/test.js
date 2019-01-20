const assoc = require('./assoc.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function assoc_test() {
  compose(
    () => {
      let obj = {a: 1, c: [[1]]};
      let assocObj = assoc('b', 42, obj);

      expect('assoc test 2', {a: 1, b: 42, c: [[1]]}, assocObj);
      expect('assoc test 1', undefined, obj.b);

      assocObj.c[0][0] = 'reference kept';
      expect('assoc test 2', 'reference kept', obj.c[0][0]);
    },
    () => {
      let obj = {a: 1, b: 2, c: 3};
      let assocObj = assoc('b', 42, obj);

      expect('assoc test 1', {a: 1, b: 42, c: 3}, assocObj);
      expect('assoc test 1', 2, obj.b);
    }
  )();
}

module.exports = assoc_test;
