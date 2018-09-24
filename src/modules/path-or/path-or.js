const path = require('../path/path.js');

// pathOr :: (a, [Key], {a}) -> a
function pathOr(dflt, xs, xo) {
  return path(xs, xo) || dflt;
}

module.exports = pathOr;