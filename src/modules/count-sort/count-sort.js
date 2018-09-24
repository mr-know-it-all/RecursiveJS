const length = require('../length/length.js');

// countSort :: Ord a => [a] -> [a]
function countSort(unsortedList, [start, end]) {
  let range = (function buildRange(index = start, acc = []) {
    return index === end ? [...acc, [index, 0]] : buildRange(index + 1, [...acc, [index, 0]]);
  })();

  (function countValues([x, ...xs]) {
    if(x === undefined) return;

    (function addCount([c, ...cs]) {
      if(c === undefined) return void 0;
      if(x === c[0]) return (c[1] = c[1] + 1), void 0;
      return addCount(cs);
    })(range);

    return countValues(xs);
  })(unsortedList);

  (function addPreviousCounts(range, index = 0) {
    if(index === length(range)) return void 0;
    if(index) range[index][1] = Number(range[index][1]) + Number(range[index - 1][1]);
    return addPreviousCounts(range, index + 1);
  })(range)

  return (function updateFinalList([x, ...xs], range, finalList) {
    if(x === undefined) return finalList;

    (function getValueIndex(range, index = 0) {
      if(index === length(range)) return void 0;
        if(x === range[index][0]) {
          finalList[range[index][1] - 1] = x;
          range[index][1] = range[index][1] - 1;
        }
        return getValueIndex(range, index + 1);
    })(range);

    return updateFinalList(xs, range, finalList);
  })(unsortedList, range, []);
}

module.exports = countSort;