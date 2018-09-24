const take = require('../take/take.js');

// aperture :: (Number, [a]) -> [[a]]
function aperture(n, xs) {
  return (function aperture([x, ...xs], acc = []) {
    return n - 1 > xs.length ? acc : aperture(xs, [...acc, [x, ...take(n - 1, xs)]])
  })(xs);
}

module.exports = aperture;