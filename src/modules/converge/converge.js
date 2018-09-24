const map = require('../map/map.js');

// converge :: todo
function converge(cFn, fns) {
  return v => cFn(...map(fn => fn(v), fns));
}

module.exports = converge;