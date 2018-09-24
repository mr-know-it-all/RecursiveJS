const curry = require('../curry/curry.js');
const length = require('../length/length.js');
const map = require('../map/map.js');
const range = require('../range/range.js');

// levenshteinDistance :: String -> String -> Number
function levenshteinDistance(xs, ys) {
  let rowsLength = length(ys) + 1;
  let colsLength = length(xs) + 1;
  let data = xs => range(0, length(xs) + 1);
  let strTable = curry(map)(row => curry(map)(() => null)(data(xs)))(data(ys));

  (function fillFirstRow(index = 0) { return index >= colsLength ? void 0 : (strTable[0][index] = index, fillFirstRow(index+1)); })();
  (function fillFirstCol(index = 0) { return index >= rowsLength ? void 0 : (strTable[index][0] = index, fillFirstCol(index+1)); })();

  (function forEachRow(rowIndex = 1) {
    if(rowIndex >= rowsLength) return;
    (function forEachRowCol(colIndex = 1) {
      if(colIndex >= colsLength) return;
      strTable[rowIndex][colIndex] = Math.min(
        strTable[rowIndex - 1][colIndex] + 1, // insertion
        strTable[rowIndex][colIndex - 1] + 1, // deletion
        strTable[rowIndex - 1][colIndex - 1] + (xs[colIndex - 1] === ys[rowIndex - 1] ? 0 : 1), // substitution
      );
      return forEachRowCol(colIndex+1);
    })();
    return forEachRow(rowIndex+1);
  })();

  return strTable[rowsLength-1][colsLength-1];
}

module.exports = levenshteinDistance;