// range :: Number -> Number -> [Number]
function range(from, to) {
  return (function range(from, to, acc = []) {
    return from === to ? acc : range(from + 1, to, [...acc, from]);
  })(from, to)
}

module.exports = range;