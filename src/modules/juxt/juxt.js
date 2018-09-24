// juxt :: ([* -> a], [*]) -> [a]
function juxt(fns, xs) {
  return (function juxt([fn, ...fns], acc = []) {
    return fn === undefined && acc || juxt(fns, [...acc, fn(...xs)]);
  })(fns);
}

module.exports = juxt;