const length = require('../length/length.js');
const objectEntries = require('../object-entries/object-entries.js');

// cycleSort :: Int a -> [a] -> [a]
function cycleSort(list) {
  return (function cycleSort([x, ...xs], cycles = {}) {
    if(x === undefined) return (function writeToList([x, ...xs]) {
      if(x === undefined) return list;
      let [value, indexes] = x;

      (function writeAtIndex([x, ...xs], count) {
        if(x === undefined) return void 0;
        list[x + count] = Number(value); // <- here's where we write, once for every element
        writeAtIndex(xs, count - 1);
      })(indexes, length(indexes) - 1);

      return writeToList(xs);
    })(objectEntries(cycles));

    let startIndex = (function smallerThanX([y, ...ys], startIndex = 0) {
      return y === undefined ? startIndex : smallerThanX(ys, y < x ? startIndex + 1 : startIndex);
    })(list);

    cycles[x] = [...(cycles[x] || []), startIndex];
    return cycleSort(xs, cycles);
  })(list);
}

module.exports = cycleSort;