const length = require('../length/length.js');

// splitWhen :: (a -> Boolean) -> [a] -> [[a], [a]]
function splitWhen(pred, xs) {
  const type = typeof xs;
  return (function splitWhen([x, ...xs], acc = []) {
    return x === undefined ? acc : splitWhen(
      xs,
      type !== 'string' ?
        pred(x) || length(acc) === 0 ? [...acc, [x]] : (acc[length(acc) - 1] = [...acc[length(acc) - 1], x], acc) :
        pred(x) || length(acc) === 0 ? [...acc, x] : (acc[length(acc) - 1] = `${acc[length(acc) - 1]}${x}`, acc)
    );
  })(xs);
}

module.exports = splitWhen;