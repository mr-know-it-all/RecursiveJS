const length = require('../length/length.js');
const filter = require('../filter/filter.js');

// quickSelect :: Ord a => (Number := Integer, [a]) -> a
function quickSelect(kth, list) {
  // pivot is to be chosen in a smarter way
  const [x, ...xs] = list;
  // a single pass partition function should be used in production code
  const left = filter(y => y < x, xs);
  const right = filter(y => !(y < x), xs);
  const leftLen = length(left);

  return (
    kth < leftLen + 1
    ? quickSelect(kth, left)
    : kth > leftLen + 1
    ? quickSelect(kth - leftLen - 1, right)
    : x
  );
}

module.exports = quickSelect;
