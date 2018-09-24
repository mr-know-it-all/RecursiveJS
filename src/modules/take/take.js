// take :: (Number, [a]) -> [a]
function take(count, xs) {
  return (function take(count, [x, ...xs], acc = []) {
    return count === 0 && acc || take(count - 1, xs, [...acc, x]);
  })(count, xs);
}

module.exports = take;