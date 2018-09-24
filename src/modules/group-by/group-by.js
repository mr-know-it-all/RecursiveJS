// groupBy :: (a -> String) -> [a] -> {String: [a]}
function groupBy(groupFn, xo) {
  return (function groupBy([x, ...xo], acc = {}) {
    return (
      x === undefined ? acc :
        groupBy(xo, (acc[groupFn(x)] = acc[groupFn(x)] ? [...acc[groupFn(x)], x] : [x], acc))
    );
  })(xo);
}

module.exports = groupBy;