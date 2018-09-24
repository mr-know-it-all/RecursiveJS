const find = require('../find/find.js');

// union :: [*] -> [*] -> [*]
function union(xs, ys) {
  return (function union([x,  ...xs], ys, acc = []) {
    return (
      x === undefined && ys === undefined ? acc :
        x === undefined && ys !== undefined ? union(ys, undefined, acc) :
          union(xs, ys, [...(find(y => y === x, acc) ? acc : [...acc, x])])
    );
  })(xs, ys);
}

module.exports = union;