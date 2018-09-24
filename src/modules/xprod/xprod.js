const map = require('../map/map.js');

// xprod :: ([a], [b])-> [[a, b]]
function xprod(xs, ys) {
  return (function xprod([x, ...xs], acc = []) {
    return x === undefined ? acc : xprod(xs, [...acc, ...map(y => [x, y], ys)]);
  })(xs);
}

module.exports = xprod;