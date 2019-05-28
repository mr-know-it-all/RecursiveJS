const length = require('../length/length.js');
const reverse = require('../reverse/reverse.js');

// groupWith :: ((a, a) -> Bool) -> [a] -> [[a]]
function groupWith(groupFn, xs) {
  return (function groupWith([x, ...xs], acc = []) {
    if(x === undefined) return acc;
    if(length(acc) === 0) return groupWith(xs, [...acc, [x]]);

    const [prevElem, ...rest] = reverse(acc);
    const [innerPrevElem] = reverse(prevElem);

    return (
      groupFn(innerPrevElem, x)
        ? groupWith(xs, [...reverse(rest), [...prevElem, x]])
        : groupWith(xs, [...acc, [x]])
    );
  })(xs);
}

module.exports = groupWith;
