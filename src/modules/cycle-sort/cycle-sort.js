const length = require('../length/length.js');
const objectEntries = require('../object-entries/object-entries.js');

// cycleSort :: Ord a => [a] -> ()
function cycleSort(list) {
  let N = length(list);
  (function forEveryIndexButTheLast(eIndex) {
    if(eIndex === N - 1) return;

    let item = list[eIndex];
    let pos = eIndex;

    (function forEveryIndexToTheRight(index) {
      if(index === N) return;
      if(list[index] < item) pos++;
      forEveryIndexToTheRight(index + 1);
    })(eIndex + 1);

    if(pos === eIndex) {
      forEveryIndexButTheLast(eIndex + 1);
      return;
    }

    (function whileDuplicates() {
      if(item !== list[pos]) return;
      pos++;
      whileDuplicates();
    })();

    [list[pos], item] = [item, list[pos]];

    (function whileCycleIsNotComplete() {
      if(pos === eIndex) return;

      pos = eIndex;
      (function forEveryIndexToTheRight(index) {
        if(index === N) return;
        if(list[index] < item) pos++;
        forEveryIndexToTheRight(index + 1);
      })(pos + 1);

      (function whileDuplicates() {
        if(item !== list[pos]) return;
        pos++;
        whileDuplicates();
      })();

      [list[pos], item] = [item, list[pos]];

      whileCycleIsNotComplete();
    })();

    forEveryIndexButTheLast(eIndex + 1);
  })(0)
}

module.exports = cycleSort;

// standard_cycleSort :: Ord a => [a] -> ()
function standard_cycleSort(list) {
  // let writes = 0;
  for(let i = 0; i < list.length - 1; i++) {
    let item = list[i];
    let pos = i;
    for(let j = i + 1; j < list.length; j++) if(list[j] < item) pos++;
    if(pos === i) continue;
    while(item === list[pos]) { pos++; }

    [list[pos], item] = [item, list[pos]];
    // writes++;

    while(pos !== i) {
      pos = i;
      for(let  j = i + 1; j < list.length; j++) if(list[j] < item) pos++;
      while(item === list[pos]) { pos++; }

      [list[pos], item] = [item, list[pos]];
      // writes++;
    }
  }
  // return writes
}
