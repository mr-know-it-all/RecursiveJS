const deepFreeze = require('./deep-freeze.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function deepFreeze_test() {
  compose(
    () => {
      let obj = deepFreeze({a: {b: {c: {d: {e: {f: {g: {h: [0, {i: 42}]}}}}}}}});
      try {
        obj.a.b.c.d.e.f.g.h[1].i = 3;
      } catch(e) {
        expect('deep freeze test 4', 'TypeError', e.name);
      }
      expect('deep freeze test 4', 42, obj.a.b.c.d.e.f.g.h[1].i);
    },
    () => {
      let obj = deepFreeze({a: {b: {c: 42, d: [42]}}});
      try {
        obj.a.b.c = 3;
        obj.a.b.d[0] = 3;
      } catch(e) {
        expect('deep freeze test 3', 'TypeError', e.name);
      }
      expect('deep freeze test 3', [42, 42], [obj.a.b.c, obj.a.b.d[0]]);
    },
    () => {
      let obj = deepFreeze({a: {b: {c: 42}}});
      try {
        obj.a.b.c = 3;
      } catch(e) {
        expect('deep freeze test 2', 'TypeError', e.name);
      }
      expect('deep freeze test 2', 42, obj.a.b.c);
    },
    () => {
      let xs = deepFreeze([1, 2, [[3]]]);
      try {
        xs[2][0][0] = 42;
        xs[0] = 42;
      } catch(e) {
        expect('deep freeze test 1', 'TypeError', e.name);
      }
      expect('deep freeze test 1', [1, 2, [[3]]], xs);
      expect('deep freeze test 1', 1, xs[0]);
    }
  )();
}

module.exports = deepFreeze_test;
