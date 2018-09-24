// partition :: ((a -> Boolean), [a]) -> [[a], [a]]
function partition(pred, xs) {
  return (function partition([x, ...xs], acc = [[], []]) {
    return x === undefined && acc || partition(
      xs, pred(x) && [
        [...acc[0], x], acc[1]
      ] || [acc[0],
        [...acc[1], x]
      ]
    );
  })(xs);
}

module.exports = partition;