// objectValues :: {Key: *} -> [[Key, *]]
function objectEntries(xo) {
  return (function objectEntries(xo, index = 0, acc = []) {
    return Object.keys(xo)[index] === undefined ? acc : objectEntries(
      xo,
      index + 1,
      [...acc, [Object.keys(xo)[index], xo[Object.keys(xo)[index]]]]);
  })(xo);
}

module.exports = objectEntries;