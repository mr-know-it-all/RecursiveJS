// reverse :: [a] -> [a]
function reverse(xs) {
  return (function reverse([x, ...xs], acc = []) {
    return x === undefined ? acc : reverse(xs, [x, ...acc]);
  })(xs);
}

module.exports = reverse;