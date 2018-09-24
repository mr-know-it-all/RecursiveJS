// concat :: ([a], [a]) -> [a]
function concat(xs, ys) {
  return [...xs, ...(Array.isArray(ys) && ys || [ys])];
}

module.exports = concat;