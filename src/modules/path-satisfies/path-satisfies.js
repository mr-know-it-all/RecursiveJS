const path = require('../path/path.js');

// pathSatisfies :: ((a -> Boolean), [Key], {a}) -> Boolean
function pathSatisfies(fn, xs, xo) {
  const data = path(xs, xo);
  return data && fn(data);
}

module.exports = pathSatisfies;