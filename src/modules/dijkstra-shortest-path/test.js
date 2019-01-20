const dijkstraShortestPath = require('./dijkstra-shortest-path.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function dijkstraShortestPath_test() {
  compose(
    () => {
      let graph = {
        start: {A: 10, B: 204, finish: 6000},
        A: {B: 2, D: 100, E: 200},
        B: {C: 4, G: 500, F: 600},
        C: {E: 6, F: 1241},
        D: {G: 400, H: 200},
        E: {H: 8},
        F: {J: 8},
        G: {I: 200},
        H: {J: 214, I: 4},
        I: {F: 64},
        J: {finish: 1},
        finish: {}
      };

      expect('dijkstraShortestPath', ['start', 'A', 'B', 'C', 'E', 'H', 'I', 'F', 'J', 'finish'], dijkstraShortestPath(graph))
    },
    () => {
      let graph = {
        start: {A: 50, B: 2},
        A: {D: 12, C: 1},
        B: {A: 24},
        C: {E: 400, F: 200},
        D: {C: 2},
        E: {F: 12},
        F: {G: 14},
        G: {finish: 12},
        finish: {}
      };

      expect('dijkstraShortestPath', ['start', 'B', 'A', 'C', 'F', 'G', 'finish'], dijkstraShortestPath(graph))
    },
    () => {
      let graph = {
        start: {A: 150, B: 20},
        A: {C: 3},
        B: {D: 30},
        C: {finish: 2},
        D: {A: 4, finish: 22},
        finish: {}
      };

      expect('dijkstraShortestPath', ['start', 'B', 'D', 'A', 'C', 'finish'], dijkstraShortestPath(graph))
    },
    () => {
      let graph = {
        start: {A: 5, B: 2},
        A: {C: 4, D: 2},
        B: {A: 8, D: 7},
        C: {D: 6, finish: 3},
        D: {finish: 1},
        finish: {}
      };

      expect('dijkstraShortestPath', ['start', 'A', 'D', 'finish'], dijkstraShortestPath(graph))
    }
  )();
}

module.exports = dijkstraShortestPath_test;
