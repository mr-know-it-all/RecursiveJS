const length = require('../length/length.js');

// splitEvery :: Number → [a] → [[a]]
function splitEvery(n, xs) {
  const type = typeof xs;
  return (function splitEvery([x, ...xs], count = 0, acc = []) {
    return x === undefined ? acc : splitEvery(
      xs,
      count + 1 === n ? 0 : count + 1,
      type !== 'string' ?
        count === 0 ? [...acc, [x]] : (acc[length(acc) - 1] = [...acc[length(acc) - 1], x], acc) :
        count === 0 ? [...acc, x] : (acc[length(acc) - 1] = `${acc[length(acc) - 1]}${x}`, acc)
    );
  })(xs);
}

module.exports = splitEvery;