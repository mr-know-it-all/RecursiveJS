const rotateMatrix = require('./rotate-matrix.js');
const compose = require('../compose/compose.js');
const { expect } = require('../../../tests/tests.js');

function rotateMatrix_test() {
  compose(
    () => {
      const matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
      ];
      const clockwise90deg = [
        [13, 9, 5, 1],
        [14, 10, 6, 2],
        [15, 11, 7, 3],
        [16, 12, 8, 4]
      ];
      const counterClockwise90deg = [
        [4, 8, 12, 16],
        [3, 7, 11, 15],
        [2, 6, 10, 14],
        [1, 5, 9, 13]
      ];
      const deg180 = [
        [16, 15, 14, 13],
        [12, 11, 10, 9],
        [8, 7, 6, 5],
        [4, 3, 2, 1]
      ];

      expect('rotateMatrix clockwise360deg test', matrix, rotateMatrix(matrix, 'clockwise', 360))
      expect('rotateMatrix counterClockwise360deg test', matrix, rotateMatrix(matrix, 'counterClockwise', 360))
      expect('rotateMatrix clockwise180deg test', deg180, rotateMatrix(matrix, 'clockwise', 180))
      expect('rotateMatrix counterClockwise180deg test', deg180, rotateMatrix(matrix, 'counterClockwise', 180))
      expect('rotateMatrix clockwise90deg test', clockwise90deg, rotateMatrix(matrix))
      expect('rotateMatrix counterClockwise90deg test', counterClockwise90deg, rotateMatrix(matrix, 'counterClockwise'))
    }
  )()
}

module.exports = rotateMatrix_test;
