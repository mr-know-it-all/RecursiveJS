// zip :: ([a], [b]) -> [a, b]
function zip(xs, ys) {
  return (function zip([x, ...xs], [y, ...ys], acc = []) {
    return (
      (x === undefined || y === undefined) && acc ||
      zip(xs, ys, [...acc, [x, y]])
    );
  })(xs, ys);
}

module.exports = zip;