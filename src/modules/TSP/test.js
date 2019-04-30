const tsp = require('./tsp.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

const g1 = {
  A: { B: 41, C: 1111, D: 141 },
  B: { A: 2, C: 47, D: 4 },
  C: { A: 2, B: 38, D: 1 },
  D: { A: 220, B: 2, C: 8 }
}

const g2 = {
  A: { B: 41, C: 1111, D: 141, E: 1, F: 1},
  B: { A: 2, C: 1, D: 4, E: 12, F: 12 },
  C: { A: 1, B: 38, D: 1, E: 12, F: 12},
  D: { A: 220, B: 2, C: 8, E: 1, F: 12 },
  E: { A: 100, B: 1, C: 13, D: 12, F: 12 },
  F: { A: 12, B: 12, C: 12, D: 2, E: 2}
}

function tsp_test() {
  compose(
    () => expect('TSP', ['A', 'F', 'D', 'E', 'B', 'C', 'A'], tsp(g2, 'A')),
    () => expect('TSP', ['A', 'B', 'D', 'C', 'A'], tsp(g1, 'A')),
  )();
}

module.exports = tsp_test;
