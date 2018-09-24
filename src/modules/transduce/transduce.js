const reverse = require('../reverse/reverse.js');

// Functor F => transduce :: [F* -> F*, F* -> F*, ...] -> F* -> F*
// TODO: this doesn't seem to be a classic transduce, will revisit it
function transduce(ops, xs) {
  return (function transduce(ops, [x, ...xs], acc = []) {
    const applyOps = ([op, ...ops], x) => op === undefined ? x : !op(x) ? undefined : applyOps(ops, op(x));

    return x === undefined ? acc : transduce(ops, xs, [...acc, ...(applyOps(reverse(ops), [x]) || [])]);
  })(ops, xs);
}

module.exports = transduce;