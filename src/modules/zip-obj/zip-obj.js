// zipObj :: ([String], [*]) -> {String: *}
function zipObj(xs, ys) {
  return (function zipObj([x, ...xs], [y, ...ys], acc = {}) {
    return x === undefined || y === undefined ? acc : zipObj(xs, ys, (acc[x] = y, acc))
  })(xs, ys);
}

module.exports = zipObj;