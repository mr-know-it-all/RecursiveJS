// fill :: (a, Number) -> [a]
function fill(element, count) {
  return (function fill(count, acc = []) {
    return count === 0 && acc || fill(count - 1, [...acc, element]);
  })(count);
}

module.exports = fill;