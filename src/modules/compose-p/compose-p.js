const reverse = require('../reverse/reverse.js');

// composeP :: ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
function composeP(...fns) {
  return initialValue =>
    (async function applyFunc([fn, ...fns], value) {
      return fn ? applyFunc(fns, await (fn(value))) : value;
    })(reverse(fns), initialValue);
}

module.exports = composeP;