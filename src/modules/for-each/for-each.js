const length = require('../length/length.js');

// forEach :: (a -> b, [a]) -> ()
function forEach(fn, xs) {
  return (function forEach(xs, index = 0) {
    if(index < length(xs)) {
      fn(xs[index], index);
      return forEach(xs, index + 1);
    }
  })(xs);
}

module.exports = forEach;