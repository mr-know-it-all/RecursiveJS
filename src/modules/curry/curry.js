const length = require('../length/length.js');

// curry :: (* -> a) → (* -> a)
function curry(fn) {
  const arity = fn.length;
  return function applyArgs(...args) {
    return length(args) === arity ? fn(...args) : (...nextArgs) => applyArgs(...args, ...nextArgs);
  };
}
// TODO: ignore function default args
module.exports = curry;
