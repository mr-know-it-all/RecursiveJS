const reverse = require('../reverse/reverse.js');
const reduce = require('../reduce/reduce.js');

// compose :: (c -> d, ..., b -> c, a -> b) -> (x -> (a -> b -> c -> d))
function compose(...fns) {
  return value => reduce((acc, fn) => fn(acc), reverse(fns), value);
}

module.exports = compose;