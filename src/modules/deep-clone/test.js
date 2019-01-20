const deepClone = require('./deep-clone.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function deepClone_test() {
  let objToClone = {z: 1, k: [1, 2, 3, {a: {b: 1}}, [1, 2]], a: {b: {c: {d: 4}, e: {f: 2}, g: 1}}};
  let deepClonedObject = deepClone(objToClone);

  compose(
     () => {
      deepClonedObject.k[4][1] = 42;
      expect('deepClone', 2, objToClone.k[4][1]);
    },
    () => {
      deepClonedObject.k[3].a.b = 42;
      expect('deepClone', 1, objToClone.k[3].a.b);
    },
    () => {
      deepClonedObject.k[0] = 42;
      expect('deepClone', 1, objToClone.k[0]);
    },
    () => {
      deepClonedObject.a.b.e.f = [1, 2, 3, 4];
      expect('deepClone', 2, objToClone.a.b.e.f);
    },
    () => {
      deepClonedObject.a.b.e.f = 42;
      expect('deepClone', 2, objToClone.a.b.e.f);
    },
    () => {
      deepClonedObject.a.b.c.d = 42;
      expect('deepClone', 4, objToClone.a.b.c.d);
    }
  )();
}

module.exports = deepClone_test;
