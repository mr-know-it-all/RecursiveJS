const assocPath = require('./assoc-path.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function assocPath_test() {
  compose(
    () => expect('assocPath test 3', {a: {b: {c: 42}}}, assocPath(['a', 'b', 'c'], 42, {})),
    () => expect('assocPath test 2', {a: {b: {c: 42}}, b: 1}, assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}, b: 1})),
    () => expect('assocPath test 1', {a: {b: {c: 42}}}, assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}))
  )();
}

module.exports = assocPath_test;
