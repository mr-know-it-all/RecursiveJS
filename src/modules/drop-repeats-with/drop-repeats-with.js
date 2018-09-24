// dropRepeatsWith :: ((a, a) -> Boolean) -> [a] -> [a]
function dropRepeatsWith(pred, xs) {
  return (function dropRepeatsWith(pred, [x, ...xs], last, acc = []) {
    return x === undefined ? acc : dropRepeatsWith(
      pred, xs, x, last === undefined ? [x] : pred(x, last) ? acc : [...acc, x]
    );
  })(pred, xs);
}

module.exports = dropRepeatsWith;