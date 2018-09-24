const length = require('../length/length.js');
const take = require('../take/take.js');

// invoker :: Number -> String -> (a -> b ... -> Object -> *)
function invoker(arity, method) {
  return function invoker(...args) {
    return (
      arity === length(args) - 1 ?
        args[length(args) - 1][method](...(take(length(args) - 1, args))) :
        (...nextArgs) => invoker(...args, ...nextArgs)
    );
  }
}

module.exports = invoker;