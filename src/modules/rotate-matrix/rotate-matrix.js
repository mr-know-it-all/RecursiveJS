// clockwise :: [[a]] -> [[a]]
function clockwise([head, ...rest]) {
  return (function forEachColumn([col, ...cols], colIndex = 0, newMatrix = []) {
    return col === undefined ? newMatrix : forEachColumn(cols, colIndex + 1, [...newMatrix, (
      (function forEachRow([row, ...rows], newRow = []) {
        return row === undefined ? newRow : forEachRow(rows, [row[colIndex], ...newRow]);
      })([head, ...rest])
    )])
  })(head);
}

// counterClockwise :: [[a]] -> [[a]]
function counterClockwise([head, ...rest]) {
  return (function forEachColumn([col, ...cols], colIndex = 0, newMatrix = []) {
    return col === undefined ? newMatrix : forEachColumn(cols, colIndex + 1, [(
      (function forEachRow([row, ...rows], newRow = []) {
        return row === undefined ? newRow : forEachRow(rows, [...newRow, row[colIndex]]);
      })([head, ...rest])
    ), ...newMatrix])
  })(head);
}

// standard code :D
// function clockwise(matrix) { return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse()); }
// function counterClockwise(matrix) { return matrix[0].map((_, i) => matrix.map(row => row[i])).reverse(); }

// rotateMatrix :: ([[a]] -> String -> Int) -> [[a]]
function rotateMatrix(matrix = [], direction = 'clockwise', degrees = 90) {
  return (
    degrees > 90
      ? rotateMatrix(({clockwise, counterClockwise})[direction](matrix), direction, degrees - 90)
      : ({clockwise, counterClockwise})[direction](matrix)
  );
}

module.exports = rotateMatrix;
