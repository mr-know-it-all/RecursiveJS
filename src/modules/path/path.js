const length = require('../length/length.js');

// path :: ([Key], {a}) -> a | Undefined
function path([x, ...xs], xo) {
  return (
    length(xs) === 0 && (xo[x] || undefined) ||
    xo[x] !== undefined && path(xs, xo[x]) ||
    undefined
  );
}

module.exports = path;