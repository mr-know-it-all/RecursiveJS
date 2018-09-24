const length = require('../length/length.js');
const compose = require('../compose/compose.js');
const insertionSort = require('..//insertion-sort/insertion-sort.js');
const mergeLists = require('../merge-lists/merge-lists.js');
const reduce = require('../reduce/reduce.js');
const splitEvery = require('../split-every/split-every.js');

// timSort :: Ord a => [a] -> [a]
function timSort(xs) {
  // this is not a totally accurrate timSort
  const RUN = 2;
  if(length(xs) <= RUN) return insertionSort(xs);

  // sortAndMerge :: Ord a => [[a]] -> [a]
  const sortAndMerge = (acc, v) => compose(v => mergeLists(acc, v), insertionSort)(v);
  const runs = splitEvery(RUN, xs);

  return reduce(sortAndMerge, runs, []);
}

module.exports = timSort;