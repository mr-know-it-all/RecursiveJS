const length = require('../length/length.js');

// intersperse (a, [a]) -> [a]
function intersperse(n, xs) {
  return (
    function intersperse([x, ...xs], acc = []) {
      return x === undefined ? acc : intersperse(xs, length(acc) > 0 ? [...acc, n, x] : [...acc, x])
    }
  )(xs);
}

module.exports = intersperse;