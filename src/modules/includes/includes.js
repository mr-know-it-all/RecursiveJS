// includes :: (a, [a]) -> Boolean
function includes(a, [x, ...xs]) {
  return x === undefined ? false : a === x ? true : includes(a, xs);
}

module.exports = includes;