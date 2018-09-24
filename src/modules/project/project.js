const reduce = require('../reduce/reduce.js');

// project :: ([Key], [{Key: v}]) -> [{Key: v}]
function project(xs, yss) {
  return (function project([ys, ...yss], acc = []) {
    return ys === undefined ? acc : project(yss, [
      ...acc, reduce((acc, x) => {
        if (ys[x]) acc[x] = ys[x];
        return acc;
      }, xs, {})
    ]);
  })(yss);
}

module.exports = project;