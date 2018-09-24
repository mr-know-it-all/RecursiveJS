// deepFlat :: [[[*]]] -> [*]
function deepFlat(xs) {
  return (function deepFlat([x, ...xs], acc = []) {
    return (
      x === undefined ?
        acc :
        Array.isArray(x) && deepFlat([...x, ...xs], acc) || deepFlat(xs, [...acc, x])
    );
  })(xs);
}

module.exports = deepFlat;