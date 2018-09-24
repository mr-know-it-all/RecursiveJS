// objectValues :: {Key: *} -> [*]
function objectValues(xo) {
  return (function objectValues(xo, index = 0, acc = []) {
    return Object.keys(xo)[index] === undefined ? acc : objectValues(
      xo,
      index + 1,
      [...acc, xo[Object.keys(xo)[index]]]);
  })(xo);
}

module.exports = objectValues;